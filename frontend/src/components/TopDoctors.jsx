import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>

      <h1 className='text-2xl md:text-3xl font-medium'>Related doctors</h1>

      <p className='w-full sm:w-1/3 text-center text-xs sm:text-sm px-4 sm:px-0'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 pt-5 px-3 sm:px-0'>

        {doctors.slice(0, 10).map((item, index) => (

          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 flex flex-col'
          >

            <img
              src={item.image}
              alt={item.name}
              className='bg-blue-50 w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover'
            />

            <div className='p-2 sm:p-3 md:p-4 flex-1'>

              <div className={`flex items-center gap-2 text-xs sm:text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                <div
                  className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
                ></div>

                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>

              <p className='text-gray-900 text-base sm:text-lg font-medium mt-2 min-h-[56px]'>
                {item.name}
              </p>

              <p className='text-gray-600 text-xs sm:text-sm'>
                {item.speciality}
              </p>

            </div>

          </div>

        ))}

      </div>

      <button
        onClick={() => {
          navigate('/doctor')
          scrollTo(0, 0)
        }}
        className='bg-blue-300 text-white px-4 sm:px-6 py-2 rounded-full mt-4 hover:bg-blue-700 text-sm sm:text-base transition-colors'
      >
        More
      </button>

    </div>
  )
}

export default TopDoctors