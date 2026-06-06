import axios from "axios"
import { createContext, useState, useCallback } from "react";
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://prescripto-backend-pmm0.onrender.com'
    const [dToken,setDToken]= useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
   const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
     
    const getAppointments = async () => {
        if(!dToken){
            console.log('No token available, skipping appointment fetch')
            return
        }
        
        try {
           
            
            const {data} = await axios.get(backendUrl+'/api/doctor/appointments',{ 
                headers:{Authorization:`Bearer ${dToken}`}
            })
        
            
            if(data.success){
                setAppointments(data.appointments)
                console.log('Fetched appointments:', data.appointments)
            }
            else{
                console.error(' Backend error:', data.message)
                toast.error(data.message)
            }
        }
        catch (error) {
            console.error('Error fetching appointments:', error.message)
            toast.error(error.message || 'Failed to fetch appointments')
        }
    }


    const completeAppointment = async (appointmentId) => {
        try {
            console.log('Completing appointment:', appointmentId)
            
            const {data} = await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{ 
                headers: {Authorization:`Bearer ${dToken}`}
            })

            console.log(' Complete response:', data)
         
            if(data.success){
                toast.success(data.message)
                console.log('Refreshing appointments after completion')
                await getAppointments()
            }
            else{
                toast.error(data.message)
                console.error('Complete failed:', data.message)
            }
        }
        catch (error) {
            console.error(' Error completing appointment:', error)
            toast.error(error.message || 'Failed to complete appointment')    
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            console.log('Cancelling appointment:', appointmentId)
            
            const {data} = await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{ 
                headers: {Authorization:`Bearer ${dToken}`}
            })
            
            console.log('Cancel response:', data)
        
            if(data.success){
                toast.success(data.message)
                console.log(' Refreshing appointments after cancellation')
                await getAppointments()
            }
            else{
                toast.error(data.message)
                console.error(' Cancel failed:', data.message)
            }
        }
        catch (error) {
            console.error(' Error cancelling appointment:', error)
            toast.error(error.message || 'Failed to cancel appointment')    
        }
    }

const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{ 
                headers: {Authorization:`Bearer ${dToken}`}
            })
            if(data.success){
                setDashData(data.dashData)
                console.log('Fetched dashboard data:', data.dashData)
            }
            else{
                toast.error(data.message)
                console.error('Dashboard data fetch failed:', data.message)
            }
        }
        catch (error) {
            console.error('Error fetching dashboard data:', error)
            toast.error(error.message || 'Failed to fetch dashboard data')    
        }

}
const getProfileData = async () => {
    try {
        const {data} = await axios.get(backendUrl+'/api/doctor/profile',{ 
            headers: {Authorization:`Bearer ${dToken}`}
        })
        if(data.success){
            setProfileData(data.profileData)
            console.log('Fetched profile data:', data.profileData)
        }
        else{
            toast.error(data.message)
            console.error('Profile data fetch failed:', data.message)
        }
    }
    catch (error) {
        console.error('Error fetching profile data:', error)
        toast.error(error.message || 'Failed to fetch profile data')    
     }
}

    const value = {
        backendUrl,
        dToken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,getDashData,setDashData,
        profileData,getProfileData,setProfileData
    }
    
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider