import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const { aToken,dashData,getDashData ,cancelAppointment,} = useContext(AdminContext) 
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    getDashData()
  }, [aToken])

  return dashData &&(
    <div className='m-5'>
      <div className='flex items-center gap-5 mb-5'>
            <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transitiion-all rounded p-5 flex min-w-52 items-center gap-5'>
            <img className='w-16 h-16' src={assets.doctor_icon} alt="Dashboard" />
            <div>
              <p className='text-2xl font-bold text-gray-600'>{dashData.totalDoctors}</p>
              <p className='text-gray-500 font-semibold'>Doctors</p>
            </div>
          </div>

          <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transitiion-all rounded p-5 flex min-w-52 items-center gap-5'>
            <img className='w-16 h-16' src={assets.appointment_icon} alt="Dashboard" />
            <div>
              <p className='text-2xl font-bold text-gray-600'>{dashData.totalAppointments}</p>
              <p className='text-gray-500 font-semibold' >Appointments</p>
            </div>
          </div>

          <div className='bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 transitiion-all rounded p-5 flex min-w-52 items-center gap-5'>
            <img className='w-16 h-16' src={assets.patient_icon} alt="Dashboard" />
              <div>
                <p className='text-2xl font-bold text-gray-600'>{dashData.totalUsers}</p>
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
              src={item.docData?.image || 'https://via.placeholder.com/40'}
              alt="doctor"
            />

            <p>
              {item.docData?.name || 'Unknown Doctor'}
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div>

          {item.cancelled 
              ? <p className='text-red-500 text-xs font-medium'>Cancelled</p> 
              : (
             item.isCompleted ?  <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className = 'w-10 cursor-pointer ' src={assets.cross_icon} alt='Cancel'></img>
           )}

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

export default Dashboard
