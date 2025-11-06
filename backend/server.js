import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import { connect } from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json());
app.use(cors());

//api endpoints

app.use('/api/admin', adminRouter)  // localhost:4000/api/admin


app.get('/',(req,res)=>{
    res.send('API working')
})



//To start the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});