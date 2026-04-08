import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex bg-[#5f6FFF] text-white items-center justify-between px-6 pt-10 rounded-lg md:mx-10 mt-10 overflow-hidden'>

      {/* left-side content */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>

        <button
          onClick={() => navigate('/login')}
          className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
          Create account
        </button>
      </div>

      {/* right-side content */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px]'>
        <img
          className='w-full max-w-md'
          src={assets.appointment_img}
          alt=""
        />
      </div>

    </div>
  )
}

export default Banner
