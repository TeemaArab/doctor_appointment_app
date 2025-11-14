import jwt from 'jsonwebtoken';

//doctor authentication middleware

const authDoctor = async(req,res,next)=>{
   try{
    const bearer = req.headers.authorization || '';
      const {dtoken}= req.headers || (bearer.startsWith('Bearer ') ? bearer.slice(7) : null);
      if(!dtoken){
        return res.json({success:false, message:"Not Authorized Login Again"})

      }
      const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body = req.body || {};   
        req.body.docId = token_decode.id;
        next();
      
      }catch(error){
        console.log(error);
        res.json({msg:"Authentication error"})
   }
}


export default authDoctor;
