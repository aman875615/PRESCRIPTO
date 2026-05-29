import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData ,cancelAppointment,completeAppointment} = useContext(DoctorContext)
  const { calculateAge ,slotDateFormat} = useContext(AppContext)
  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])



  return (
    <div className='m-5'>

      <div className='flex items-center gap-5 mb-5'>

        <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all rounded p-5 flex min-w-52 items-center gap-5'>
          <img className='w-16 h-16' src={assets.earnings_icon} alt="Dashboard" />
          <div>
            <p className='text-2xl font-bold text-gray-600'>
              {dashData.earnings}
            </p>
            <p className='text-gray-500 font-semibold'>Earnings</p>
          </div>
        </div>

        <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all rounded p-5 flex min-w-52 items-center gap-5'>
          <img className='w-16 h-16' src={assets.appointment_icon} alt="Dashboard" />
          <div>
            <p className='text-2xl font-bold text-gray-600'>
              {dashData.appointments}
            </p>
            <p className='text-gray-500 font-semibold'>Appointments</p>
          </div>
        </div>

        <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all rounded p-5 flex min-w-52 items-center gap-5'>
          <img className='w-16 h-16' src={assets.patient_icon} alt="Dashboard" />
          <div>
            <p className='text-2xl font-bold text-gray-600'>
              {dashData.patients}
            </p>
            <p className='text-gray-500 font-semibold'>Patients</p>
          </div>
        </div>

      </div>

      <div className=' flex items-center gap-2 px-4 py-4 mt-10 rounded-t border border-gray-100 bg-white rounded p-5'>
            <img className='w-8 h-8' src={assets.latestAppointment_icon} alt="Dashboard" />
            <p className='text-gray-500 font-semibold'>Latest Appointments</p>
      </div>

       <div className='bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[40vh] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        {dashData.latestAppointments &&
         dashData.latestAppointments.length > 0 ? (
      
          dashData.latestAppointments.map((item, index) => (
      
            <div
              key={index}
              className='flex items-center justify-between gap-4 text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            >
      
              {/* Left Side */}
              <div className='flex items-center gap-4'>
      
                <p className='hidden sm:block'>
                  {index + 1}
                </p>
      
                <div className='flex items-center gap-2'>
      
                  <img
                    className='w-10 h-10 rounded-full object-cover bg-gray-200'
                    src={item.userData?.image || 'https://via.placeholder.com/40'}
                    alt="doctor"
                  />
      
                  <p>
                    {item.userData?.name || 'Unknown Doctor'}
                  </p>
      
                </div>
      
              </div>
      
              {/* Right Side */}
              <div>
      
                {
                    item.cancelled ? (
                                    <p className='text-red-500 font-semibold'>Cancelled</p>
                                  ) : item.isCompleted ? (  
                                    <p className='text-green-500 font-semibold'>Completed</p>
                                  ) : <div className='flex gap-3 justify-center'>
                                  <button onClick={() => cancelAppointment(item._id)} className='p-1 hover:bg-red-50 rounded transition'>
                                    <img src={assets.cross_icon} alt="cancel" className='w-5 h-5' />
                                  </button>
                                  <button onClick={() => completeAppointment(item._id)} className='p-1 hover:bg-green-50 rounded transition'>
                                    <img src={assets.tick_icon} alt="confirm" className='w-5 h-5' />
                                  </button>
                   </div>
                
                                }
      
              </div>
      
            </div>
      
          ))
      
        ) : (
      
          <p className='text-center text-gray-500 py-10'>
            No appointments found.
          </p>
      
        )}
      </div>

    </div>
  )
}

export default DoctorDashboard