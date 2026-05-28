import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData } = useContext(DoctorContext)

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

    </div>
  )
}

export default DoctorDashboard