import React from 'react'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>Us</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
     

      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to Prescripto, your reliable partner in managing healthcare easily and efficiently. At Prescripto, we understand the difficulties people face when scheduling doctor appointments or keeping track of their health records.</p>
        <p> We are dedicated to delivering excellence in healthcare technology. Our goal is to continuously enhance our platform by using the latest innovations to improve user experience and provide outstanding service. Whether you’re booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>To be the leading platform for healthcare management, empowering patients and providers through technology.</p>
      </div>
      </div>

      <div className='text-xl my-4'>
        <p> Why <span className='text-gray-700 font-semibold'>Choose Us</span> </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b >Efficiency:</b>
          <p>Our platform streamlines the healthcare process, saving you time and effort.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Convenience: </b>
          <p> Access your health records and book appointments from anywhere, at any time.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Personalization: </b>
          <p>We tailor our services to meet your unique needs, ensuring a healthcare experience that fits you perfectly.</p>
        </div>
       
      </div>


    </div>
  )
}

export default About
