
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/useRoute.js';



const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();



// core middlewares

app.use(cors());
app.use(express.json());

// mount router
app.use('/api/admin', adminRouter);
//console.log('Mounted: /api/admin');

app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

