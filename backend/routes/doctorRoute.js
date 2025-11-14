import express from 'express';
import { doctorList, loginDoctor, appointmentsDoctor,appointmentCancelled, appointmentCompleted  } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.post('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentCompleted);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancelled);

export default doctorRouter;