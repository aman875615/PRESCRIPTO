import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointment = () => {

  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext)

  const { calculateAge, slotDateFormat } =
    useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>
        All Appointments
      </p>

      <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>

          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>

        </div>

        {/* Appointment List */}
        {appointments && appointments.length > 0 ? (

          appointments.map((item, index) => (

            <div
              key={index}
              className='flex flex-wrap max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            >

              {/* Index */}
              <p className='max-sm:hidden'>
                {index + 1}
              </p>

              {/* Patient */}
              <div className='flex items-center gap-2'>

                <img
                  className='w-8 h-8 rounded-full object-cover'
                  src={item.userData?.image || 'https://via.placeholder.com/40'}
                  alt="user"
                />

                <p>
                  {item.userData?.name || 'Unknown User'}
                </p>

              </div>

              {/* Age */}
              <p>
                {item.userData?.dob
                  ? calculateAge(item.userData.dob)
                  : 'N/A'}
              </p>

              {/* Date & Time */}
              <p>
                {item.slotDate
                  ? `${slotDateFormat(item.slotDate)}, ${item.slotTime}`
                  : 'No Date'}
              </p>

              {/* Doctor */}
              <div className='flex items-center gap-2'>

                <img
                  className='w-8 h-8 rounded-full object-cover bg-gray-200'
                  src={item.docData?.image || 'https://via.placeholder.com/40'}
                  alt="doctor"
                />      

                <p>
                  {item.docData?.name || 'Unknown Doctor'}
                </p>

              </div>

              {/* Fees */}
              <p>
                ${item.amount || item.fees || 0}
              </p>

              {/* Actions */}
              {item.cancelled 
              ? <p className='text-red-500 text-xs font-medium'>Cancelled</p> 
              : (
                item.isCompleted ?  <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className = 'w-10 cursor-pointer ' src={assets.cross_icon} alt='Cancel'></img>
              )}

            </div>
          ))

        ) : (

          <p className='p-5 text-gray-500'>
            No appointments found
          </p>

        )}

      </div>
    </div>
  )
}

export default AllAppointment