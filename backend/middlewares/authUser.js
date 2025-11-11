import jwt from 'jsonwebtoken';

//user authentication middleware

const authUser = async(req,res,next)=>{
   try{
    const bearer = req.headers.authorization || '';
      const {token}= req.headers || (bearer.startsWith('Bearer ') ? bearer.slice(7) : null);
      if(!token){
        return res.json({success:false, message:"Not Authorized Login Again"})

      }
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body = req.body || {};   
        req.body.userId = token_decode.id;
        next();
      
      }catch(error){
        console.log(error);
        res.json({msg:"Authentication error"})
   }
}

export default authUser;

