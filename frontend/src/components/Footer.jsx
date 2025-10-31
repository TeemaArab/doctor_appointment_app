import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/* -------------Left Section---------------------  */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Soluta exercitationem dicta nam consequuntur aliquam blanditiis aperiam 
              totam vero qui laborum quia magni, excepturi provident itaque quae odit porro sequi 
              repellat quaerat dolores. Eius, dolorem, tempora quis rerum, 
              veniam autem veritatis vero eligendi deserunt quod quas?
               Dolores fugit in hic nisi.</p>
        </div>
      {/* -------------center Section---------------------  */}
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
      {/* -------------Right Section---------------------  */}
        <div>
           <p className='text-xl font-medium mb-5'>Get In Touch</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-416-789-5098</li>
            <li>info@company.com</li>
           </ul>
        </div>

      </div>
      {/* ------------Copyright Section ----------------------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025© Prescripto. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
