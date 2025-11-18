import { createContext, useState } from "react";
import axios from "axios";
import{toast} from 'react-toastify';

export const DoctorContext = createContext();
const DoctorContextProvider = (props) =>{

    const backendUrl = 'https://doctor-appointment-backend-7ak2.onrender.com';

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
 
    const[appointments, setAppointments] = useState([]);

    const[profileData, setProfileData] = useState(false);

    //dashboard data state in doctor panel
    const[dashData, setDashData] = useState(false);

    const getAppointments = async()=>{
        try{
           const {data} = await axios.post(backendUrl + '/api/doctor/appointments',{}, {headers:{dtoken: dToken}});
           if(data.success){
            setAppointments(data.appointments);
            console.log(data.appointments);
           }else{
            toast.error(data.message);
           }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
            
    }

    // --------------------------------
    //function to mark appointment as completed in doctor panel
     const completeAppointment = async(appointmentId) =>{
        try{
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dtoken: dToken}});
               if(data.success){
                toast.success(data.message);
                getAppointments();

                  if (typeof getDashData === 'function') {
                     getDashData();
                  }
               }else{
                toast.error(data.message);
               }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
     }


       //function to mark appointment as cancelled in doctor panel
     const cancelAppointment = async(appointmentId) =>{
        try{
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dtoken: dToken}});
               if(data.success){
                toast.success(data.message);
                getAppointments();
               }else{
                toast.error(data.message);
               }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
     }

     // function to get dashboard data for doctor panel

    const getDashData = async()=>{
        try{
            const{data}= await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{dtoken: dToken}});
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

//fetch api for doctor profile data
const getProfileData = async() =>{
    try{
        const{data} = await axios.get(backendUrl + '/api/doctor/profile', {headers:{dtoken: dToken}});
        if(data.success){
            setProfileData(data.profileData);
            console.log(data.profileData);
        }else{
            toast.error(data.message);
        }
    }catch(error){
        console.log(error);
        toast.error(error.message);
    }
}


    const value = {
     dToken, setDToken,
     backendUrl,
     appointments, setAppointments,
     getAppointments,
     completeAppointment,
     cancelAppointment,
     dashData, setDashData,
     getDashData,
    profileData, setProfileData,
     getProfileData
}
return(
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
)
}

export default DoctorContextProvider;
