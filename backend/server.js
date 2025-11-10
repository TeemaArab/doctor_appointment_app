// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config'
// import connectDB from './config/mongodb.js';
// import { connect } from 'mongoose';
// import connectCloudinary from './config/cloudinary.js';
// import adminRouter from './routes/adminRoute.js';

// // app config
// const app = express();
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()


// // middlewares
// app.use(express.json());
// app.use(cors());


// // ✅ Log every request BEFORE routes (to see what comes in)
// app.use((req, _res, next) => {
//   console.log('[REQ]', req.method, req.url);
//   next();
// });
// //api endpoints

// app.use('/api/admin', adminRouter)  // localhost:4000/api/admin
// console.log('Mounted: /api/admin');


// // ✅ Add a direct ping (to confirm server is reachable)
// app.get('/__ping', (_req, res) => res.json({ ok: true, where: 'server' }));

// // ✅ Add a simple root test
// app.get('/', (req, res) => {
//   res.send('API working');
// });

// // ✅ Catch-all for 404 to see unmatched URLs
// app.use((req, res) => {
//   console.log('[404]', req.method, req.originalUrl);
//   res.status(404).send('Not found');
// });



// //To start the server
// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`);
// });


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();



// core middlewares
app.use(express.json());
app.use(cors());

// mount router
app.use('/api/admin', adminRouter);
console.log('Mounted: /api/admin');





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

