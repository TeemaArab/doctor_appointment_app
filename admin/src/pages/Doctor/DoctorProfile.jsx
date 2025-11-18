import React from 'react'
import{DoctorContext} from '../../context/DoctorContext'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

   const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext);
   const{currency} = useContext(AppContext);
   
   // to sace data in doctor profile saved in the database

   const updateProfile = async()=>{
    try{
       const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available
       }
       const{data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dtoken: dToken}});
        if(data.success){
          toast.success(data.message);
          setIsEdit(false);
          getProfileData();
        } else{
          toast.error(data.message);
        }
    }catch(error){
        
        toast.error(error.message);
        console.log(error);
    }
   }

   // to add functionality to the edit buttn
   const[isEdit,setIsEdit] = useState(false);

   useEffect(()=>{
    if(dToken){
      getProfileData();
    }

   },[dToken])

  return  profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='w-full bg-primary/80  rounded-lg sm:max-w-64 ' src={profileData.image} alt="" />
        </div>
        
        
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white '>
           {/* doc info: name,degree,experience */}
           <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
           <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
           </div>

           {/* ------------doctor About -------------- */}
           <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 '>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
           </div>
           
           <p className='text-gray-600 font-medium mt-4'>Appointment Fee: <span className='text-gray-800'>{currency}{isEdit ? <input  type='number' onChange={(e)=>setProfileData(prev =>({...prev, fee: e.target.value }))} value={profileData.fee}/> : profileData.fee}</span></p>

           <div className='flex gap-2 py-2'>
            <p className='text-sm'>Address:</p>
            <p >
              { isEdit ? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, address: {...prev.address, line1: e.target.value }}))} value={profileData.address.line1}/> : profileData.address.line1}
              <br />
              { isEdit ? <input type='text' onChange={(e)=>setProfileData(prev =>({...prev, address: {...prev.address, line2: e.target.value }}))} value={profileData.address.line2}/> : profileData.address.line2}
            </p>
           </div>

           <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev => ({...prev,available: !prev.available}))}  checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
           </div>

           { 
           isEdit 
           ? <button onClick={updateProfile} className='mt-5 px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'>Save</button>
           :  <button onClick={() => setIsEdit(true)} className='mt-5 px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
           }
          
           
        </div>
      </div>
    </div>
   
  )
}

export default DoctorProfile
