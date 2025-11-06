import upload from '../middlewares/multer.js';
import express from 'express';
import { addDoctor, loginAdmin } from '../controllers/adminController.js';


const adminRouter = express.Router()

// ✅✅ TEMPORARY ROUTE for debugging file upload
adminRouter.post('/debug-any', upload.any(), (req, res) => {
  console.log('FILES =>', req.files?.map(f => ({
    fieldname: f.fieldname,
    originalname: f.originalname,
    mimetype: f.mimetype
  })));
  console.log('BODY =>', req.body);
  res.json({
    files: req.files?.map(f => ({ fieldname: f.fieldname, originalname: f.originalname })),
    body: req.body
  });
});

// ✅ REAL ROUTE

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)


export default adminRouter;