import upload from '../middlewares/multer.js';
import express from 'express';
console.log('>>> adminRoute.js LOADED'); 
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router()

// ✅✅ HEALTH CHECK ROUTE
adminRouter.get('/_ping', (req, res) => res.json({ ok: true, where: 'admin router' }));


// ✅ REAL ROUTE

adminRouter.post('/add-doctor', authAdmin,upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)

adminRouter.get('/all-doctors',  authAdmin, allDoctors);

adminRouter.post('/all-doctors', authAdmin,allDoctors)

adminRouter.post('/change-availability', authAdmin,changeAvailability)

adminRouter.get('/all-appointments', authAdmin, appointmentsAdmin);

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);

adminRouter.get('/dashboard', authAdmin, adminDashboard);



// Show what this router exposes
console.log(
  'adminRouter routes ->',
  adminRouter.stack
    .filter(l => l.route)
    .map(l => Object.keys(l.route.methods)[0].toUpperCase() + ' ' + l.route.path)
);


export default adminRouter;