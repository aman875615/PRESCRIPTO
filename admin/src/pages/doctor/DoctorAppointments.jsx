import React,{useState,useEffect} from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'

const DoctorAppointments = () => {
  const {appointments,dToken,getAppointments,completeAppointment,cancelAppointment,loading} = useContext(DoctorContext)
  const {calculateAge,slotDateFormat } = useContext(AppContext)
  
  useEffect(() => {
    if(dToken){
      console.log(' DoctorAppointments - Initial fetch')
      getAppointments()
    }
  }, [dToken])

  // Auto-refresh appointments every 5 seconds
  useEffect(() => {
    if(!dToken) return
    
    const interval = setInterval(() => {
      getAppointments()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [dToken, getAppointments])


  return (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6'>
      <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-6'>All Appointments</h1>

      <div className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
        {/* Desktop Header */}
        <div className='hidden sm:grid grid-cols-[1fr_1.5fr_1fr_0.8fr_1.2fr_0.8fr_1fr] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        <div className='max-h-[80vh] min-h-[50vh] overflow-y-auto divide-y divide-gray-200'>
          {loading && (
            <div className='flex items-center justify-center h-64'>
              <p className='text-gray-500 text-lg'>Loading appointments...</p>
            </div>
          )}
          
          {!loading && appointments && appointments.length > 0 ? (
            appointments.reverse().map((item, index) => (
              <div 
                className='hidden sm:grid grid-cols-[1fr_1.5fr_1fr_0.8fr_1.2fr_0.8fr_1fr] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors text-sm text-gray-700' 
                key={item._id || index}
              >
                <p className='font-medium'>{index + 1}</p>
                <div className='flex items-center gap-3'>
                  <img 
                    src={item.userData?.image || ''} 
                    alt={item.userData?.name || 'Patient'}
                    className='w-8 h-8 rounded-full object-cover' 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/32'}
                  />
                  <p className='font-medium'>{item.userData?.name || 'Unknown'}</p>
                </div>
                <p className={`px-2 py-1 rounded text-xs font-semibold ${item.payment ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {item.payment ? 'Online' : 'Cash'}
                </p>
                <p>{calculateAge(item.userData?.dob || '')}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)} {item.slotTime}</p>
                <p className='font-semibold'>${item.amount}</p>
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
            ))

          ) : !loading && (
            <div className='flex items-center justify-center h-64'>
              <p className='text-gray-500 text-lg'>No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments

