import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700'>
        My appointment
      </p>

      <div>
        {
          doctors.slice(0,3).map((item,index)=>(
            <div
              key={index}
              className='flex flex-col sm:flex-row gap-6 py-4 '
            >

              {/* Doctor Image */}
              <img
                className='w-32 bg-indigo-50'
                src={item.image}
                alt=""
              />

              {/* Doctor Info */}
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>

                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>

                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>
                    Date & Time:
                  </span> 8 April 2026 | 8:30 PM
                </p>
              </div>

              {/* Buttons */}
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-[#5f6FFF] hover:text-white transition-all duration-300'>
                  Pay Online
                </button>

                <button className='text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'>
                  Cancel appointment
                </button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments