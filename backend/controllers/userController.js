import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import Stripe from 'stripe';


//--------------------------------------------------------------------------------------------

// Api to register user

const registerUser = async(req,res) => {
    try{

        const {name,email,password} = req.body
        // check if user already exists
        if(!name || !email || !password){
            return res.json({success:false,message:"All fields are required"})
        }
        // validate email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }
        // validate strong password
        if(password.length < 8){
            return res.json({success:false,message:"Password must be at least 8 characters"})
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        // save user to database
        const userData ={
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();
        
        //create token
         const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
         res.json({success:true, token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//--------------------------------------------------------------------------------------------

// API for user login


const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
             return res.json({success:false,message:"User not found"})
        }
        const isMatch = await bycrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
             res.json({success:true, token});
        }else{
             res.json({success:false,message:"Invalid credentials"})
        }
        
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//--------------------------------------------------------------------------------------------

// api to get user profile data
 const getProfile= async(req,res) =>{
    try{
      const {userId} = req.body
      const userData = await userModel.findById(userId).select('-password'); 
       res.json({success:true, userData})
    }catch(error){
        console.log(error);
       res.json({success:false,message:error.message})
    }
}

//--------------------------------------------------------------------------------------------

// api to update user profile data
const updateProfile = async(req,res) =>{
    try{
        const {userId,name,phone, address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"All fields are required"})
        }

        await userModel.findByIdAndUpdate(userId,{
            name,
            phone,
            address:JSON.parse(address),
            dob, 
            gender 
        });  

        if(imageFile){
          // upload image to cloudinary
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"})  
          const imageURL = imageUpload.secure_url;

          await userModel.findByIdAndUpdate(userId,{image:imageURL});
        }

         res.json({success:true,message:"Profile updated successfully"})
    }catch(error){
        console.log(error);
       res.json({success:false,message:error.message})
    }
} 

// ---------------------------------------------------------------------------------------

// Api to book appointment
const bookAppointment = async(req,res) => {
    try{

        const {userId, docId, slotDate, slotTime} = req.body;
        //to get doctor data
        const docData = await doctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked;

        //checking for slot availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fee,
            slotTime,
            slotDate,
            date: Date.now()
        }

        // save data in database
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in doctor data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment booked successfully"})


    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// --------------------------------------------------------------------------------------------
// API to get user appointments for forntend my-appointment page
const listAppointment = async(req,res) =>{
    try{
    const {userId} = req.body;
    const appointments = await appointmentModel.find({userId}).sort({date:-1});
    res.json({success:true, appointments});

    }catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//--------------------------------------------------------------------------------------------
// Api to cancel appointmenta
const cancelAppointment = async(req,res) => {
    try{
        const{userId, appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // verifyb appointment belongs to user
        if(appointmentData.userId !== userId){
            return res.json({success:false,message:"Unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});

        // free up slot in doctor data after user cancelled an appointment
        const {docId, slotDate, slotTime} = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success:true,message:"Appointment cancelled successfully"})


    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//--------------------------------------------------------------------------------------------

// create logic for appointment fee payment
const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);
    
// API to make payment 

const paymentStripe = async(req,res) => {
    try{
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData ||appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled or not found"})
        }
        // create options for stripe payment
        const options={
            amount: appointmentData.amount * 100, // to remove decimal points
            currency: (process.env.CURRENCY||'CAD').toLowerCase(),
            receipt: appointmentId,
        }

        // creation of an order
        const session = await stripe.checkout.sessions.create({
              mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: options.currency,
                    product_data: {
                        name: 'Appointment Fee',
                    },
                    unit_amount: options.amount,
                },
                quantity: 1,
            }],
          
            metadata: { appointmentId: options.receipt },
            success_url: 'https://doctor-appointment-frontend-tvxr.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://doctor-appointment-frontend-tvxr.onrender.com/my-appointments',
        });
        res.json({success:true, order: session});
        
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const verifyStripePayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.json({ success: false, message: 'Missing session_id' });
    }

    // 1) Get Checkout Session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== 'paid') {
      return res.json({ success: false, message: 'Payment not completed' });
    }

    // 2) Pull appointmentId we stored in metadata
    const appointmentId = session.metadata?.appointmentId || null;

    // 3) Load appointment and update payment flag (idempotent)
    let userName = null;
    if (appointmentId) {
      const appointment = await appointmentModel.findById(appointmentId);
      userName = appointment?.userData?.name || null;

      // Prefer storing the PaymentIntent id as reference
      const paymentIntentId = session.payment_intent || session_id;

      if (appointment && !appointment.payment) {
        await appointmentModel.findByIdAndUpdate(
          appointmentId,
          { $set: { payment: true, paymentRef: paymentIntentId } },
          { new: true }
        );
      }
    }

    // Convert to major units only if you need to show it; keep raw for backend logic
    const amountTotalMinor = session.amount_total; // e.g., cents
    const currency = session.currency;            // e.g., 'cad'

    return res.json({
      success: true,
      userName,
      appointmentId,
      amount: amountTotalMinor,  // minor units
      currency,                  // lowercase ISO
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export {registerUser, loginUser, getProfile, updateProfile, bookAppointment , listAppointment, cancelAppointment, paymentStripe, verifyStripePayment};
