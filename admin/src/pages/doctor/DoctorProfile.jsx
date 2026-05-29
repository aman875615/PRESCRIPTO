import React ,{ useContext,useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'



const DoctorProfile = () => {
  const { dToken,setProfileData, getProfileData,profileData,backendUrl } = useContext(DoctorContext)
  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: {Authorization: `Bearer ${dToken}`}
      })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
        console.error('Profile update failed:', data.message)
      }
    }
    catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.message || 'Failed to update profile')
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='flex flex-col sm:flex-row gap-8 p-8'>
          {/* Profile Image Section */}
          <div className='flex-shrink-0'>
            <img 
              className='w-48 h-48 rounded-lg object-cover shadow-md border-4 border-blue-100' 
              src={profileData.image} 
              alt="Doctor Profile" 
            />
          </div>

          {/* Profile Details Section */}
          <div className='flex-1'>
            {/* Name */}
            <p className='text-4xl font-bold text-gray-800 mb-2'>{profileData.name}</p>
            
            {/* Qualification and Specialization */}
            <div className='mb-6'> 
              <p className='text-lg text-blue-600 font-semibold'>{profileData.degree} • {profileData.specialization}</p>
              <p className='text-gray-600 text-sm mt-1'>{profileData.experience} years of experience</p>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>About</h3>
              <p className='text-gray-600 leading-relaxed'>{profileData.about}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Appointment Fees</p>
                <p className='text-xl font-bold text-green-600'>₹{isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, fees: Number(e.target.value)}))}  value={profileData.fees} type="number" className='border border-gray-300 rounded px-2 py-1 w-24' /> : profileData.fees}</p>
              </div>
              
              
              <div>
                <p className='text-sm text-gray-500 font-medium'>Address</p>
                <p className='text-gray-800 text-sm'>
                  {isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))}  value={profileData.address.line1} type="text" className='border border-gray-300 rounded px-2 py-1 w-full mb-1' /> : profileData.address.line1}
                  <br />
                  {isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={profileData.address.line2} type="text" className='border border-gray-300 rounded px-2 py-1 w-full' /> : profileData.address.line2}
                </p>
              </div>    
            </div>

            {/* Availability Section */}
            <div className='flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
              <input 
              onChange={(e) => isEdit && setProfileData(prev => ({...prev, available:!prev.available} ))}
                checked={profileData.available}
                type="checkbox" 
                id="available"
                className='w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-600'
              />
              <label htmlFor="available" className='text-gray-700 font-medium cursor-pointer'>Available</label>
            </div>

            {/* Edit Button */}

            {
              isEdit
              ?  <button  onClick={updateProfile} className='w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md'>
              Save 
              </button>
             : <button  onClick={() => setIsEdit(true)} className='w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md'>
              Edit 
            </button>

            }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
