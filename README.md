# Doctor Appointment Booking App
A full-stack healthcare appointment management platform that allows patients to book appointments, doctors to manage their schedules and consultations, and administrators to oversee the entire system through a dedicated dashboard.
The application demonstrates a complete MERN-style architecture using React, Node.js, Express, and MongoDB, with secure authentication, role-based access control, image uploads, and Stripe payment integration.

## System Architecture
The application follows a three-tier architecture separating the user interface, server logic, and database.

Client Applications
│
├── Patient Frontend (React + Vite)
├── Doctor Dashboard
└── Admin Dashboard
        │
        ▼
Backend API (Node.js + Express)
        │
        ▼
MongoDB Database

-Additional services:
   Cloudinary → Image storage
   Stripe → Payment processing
   JWT → Authentication & authorization

# ----------------------------------------------------------------------------------------------------------------

## Application Modules

The system is divided into three main modules:

* Patient Portal : Allows users to register, log in, browse doctors, and book appointments.

* Doctor Dashboard : Allows doctors to manage appointments and update their profiles.

* Admin Dashboard: Allows administrators to manage doctors, appointments

# ----------------------------------------------------------------------------------------------------------------

# Features

## Patient Features
- User registration and authentication
- Secure login using JWT
- Browse available doctors
- Book doctor appointments
- Cancel booked appointments
- View appointment history
- Update personal profile
- Upload profile images
- Online payment via Stripe

# Doctor Features
- Secure doctor authentication
- View assigned appointments
- Mark appointments as completed
- Cancel appointments
- View personal dashboard statistics
- Manage profile details
- Update availability status

# Admin Features
- Secure admin login
- Add new doctors to the system
- Upload doctor profile images
- View all registered doctors
- Enable or disable doctor availability
- View all platform appointments
- Cancel appointments if necessary

# ---------------------------------------------------------------------------------------------------------------------


## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router, React Toastify
- Backend: Node.js, Express.js, Mongoose, MongoDB, JWT authentication, Mutler (file upload), Cloudinary (image hosting), Stripe API (Payment Processing)


# -------------------------------------------------------------------------------------------------------------------------

## Project Structure 


```
doctor_appointment_app
│
├── admin                       # Admin & Doctor dashboard (React + Vite)
│   ├── public
│   │   └── vite.svg
│   │
│   ├── src
│   │   ├── assets              # Images and UI assets
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── context
│   │   │   ├── AdminContext.jsx
│   │   │   ├── AppContext.jsx
│   │   │   └── DoctorContext.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Admin
│   │   │   ├── Doctor
│   │   │   └── Login.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend
│   ├── config
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   │
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   │
│   ├── middlewares
│   │   ├── authAdmin.js
│   │   ├── authDoctor.js
│   │   ├── authUser.js
│   │   └── multer.js
│   │
│   ├── models
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   └── userModel.js
│   │
│   ├── routes
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   └── userRoute.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   │   └── vite.svg
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RelatedDoctors.jsx
│   │   │   ├── SpecialityMenu.jsx
│   │   │   └── TopDoctors.jsx
│   │   │
│   │   ├── context
│   │   │   └── AppContext.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── About.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   └── PaymentSuccess.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```


# --------------------------------------------------------------------------------
# API  BASE URL
http://localhost:4000/api

## Admin Endpoints
BASE ROUTE : /api/admin

POST	`/api/admin/login`	        
POST	`/api/admin/add-doctor`	   
GET	    `/api/admin/all-doctors`	    	    
POST	`/api/admin/change-availability`	
GET	    `/api/admin/all-appointments`	   
POST	`/api/admin/cancel-appointment`	
GET	    `/api/admin/dashboard`

## Doctor API
BASE ROUTE: /api/doctor

GET	   ` /api/doctor/list`	
POST	`/api/doctor/login`	
POST	`/api/doctor/appointments`	
POST	`/api/doctor/complete-appointment`	
POST	`/api/doctor/cancel-appointment	`
GET	    `/api/doctor/dashboard	`
GET	    `/api/doctor/profile`	
POST	`/api/doctor/update-profile`	

## User API
BASE ROUTE : /api/user


 POST    `/api/user/register`              
 POST    `/api/user/login`                 
 GET     `/api/user/get-profile`           
 POST    `/api/user/update-profile`        
 POST    `/api/user/book-appointment`      
 GET     `/api/user/appointments`          
 POST   `/api/user/cancel-appointment`    
 POST    `/api/user/payment-stripe`      
 GET    `/api/user/verify-stripe-payment` 


# -------------------------------------------------------------------------------
## Demo Access
Admin demo credentials are provided for reviewers.

**Admin Login**  
Email: admin@demo.com  
Password: demo123  

**Doctor Login** 
Email: milad.arab@prescripto.com
Password: 123456789

>  Demo credentials only. No real user data is stored.

## Setup (Optional)

# Start frontend
cd frontend
npm run dev

# start admin dashboard
cd admin
npm run dev

# start backend
cd backend
npm run server
