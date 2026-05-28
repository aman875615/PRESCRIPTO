import React,{useContext} from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-5 cursor-pointer ${
      isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-600" : "hover:bg-gray-100"
    }`

  return (
    <div className='w-64 min-h-screen bg-white border-r'>

      {aToken && (
        <ul className='mt-5 text-gray-700'>

          <NavLink className={linkClass} to="/admin-dashboard">
            <img className='w-5' src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={linkClass} to="/all-appointments">
            <img className='w-5' src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          <NavLink className={linkClass} to="/add-doctor">
            <img className='w-5' src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-list">
            <img className='w-5' src={assets.people_icon} alt="" />
            <p className="hidden md:block"  >Doctors List</p>
          </NavLink>

        </ul>
      )}


       {dToken && (
        <ul className='mt-5 text-gray-700'>

          <NavLink className={linkClass} to="/doctor-dashboard">
            <img className='w-5' src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-appointments">
            <img className='w-5' src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          
          <NavLink className={linkClass} to="/doctor-profile">
            <img className='w-5' src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>

        </ul>
      )}

    </div>
  )
}

export default Sidebar 