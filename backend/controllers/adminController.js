import validator from 'validator'
import bycrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';



// API for adding doctor


const addDoctor = async(req,res) =>{
    try{
       
    
      const {name,email,password,speciality,degree,experience,about,fee,address}=req.body;
      const imageFile = req.file

      console.log({name,email,password,speciality,degree,experience,about,fee,address}, imageFile)
      

      // checking for all data to add doctor
      if(!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address ){
        return res.json({successs:false, Message:"All fields are required"})
    }

    // validating email format
    if(!validator.isEmail(email)){
        return res.json({success:false, Message:"Invalid email format. Please provide a valid email"})
    }

    //validating  strong password
    if(!password ||password.length < 8){
        return res.json({success:false, Message:"Password must be at least 8 characters long"})
    }
    // hashing doctor password
    const salt = await bycrypt.genSalt(10);
    const hashedpassword = await bycrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
    const imageUrl = imageUpload.secure_url;

    // create new doctor object
    const doctorData ={
        name,
        email,
        password:hashedpassword,
        speciality,
        degree,
        experience,
        about,
        fee,
        address:JSON.parse(address),
        date:Date.now(),
        image:imageUrl
    }


    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({success:true, Message:"Doctor added successfully"})

}catch(error){
   console.log(error)
   res.json({success:false, Message: error.message})
    }
}

// API FOR ADMIN LOGIN
    const loginAdmin = async(req,res) =>{
      try{
         const {email, password} = req.body
         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password,process.env.JWT_SECRET) 
           res.json({success:true, token}) 
         }else{
            res.json({success: false, message: "Invalid credentials"})
         }
      }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
      }
    }

    // API to get all doctors list for admin panel
    const allDoctors = async(req,res) =>{
      try{

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})

      }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
      }
    }

    //------------------------------------------------------------------------------
    // API to get all appointments list for admin panel
   const appointmentsAdmin =async(req,res)=>{
    try{

      const appointments = await appointmentModel.find({})
      res.json({success:true, appointments})
    }catch(error){
      console.log(error)
      res.json({success:false, message: error.message})
    }
   }


   //------------------------------------------------------------------------------
   // api for appointment cancellation on admin section
   const appointmentCancel = async(req,res) => {
    try{
        const{appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        
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

//-----------------------------------------------------------------------------
// api to get dashboard data for admin panel

const adminDashboard = async(req,res) =>{
  try{
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData ={
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({success:true, dashData})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard};