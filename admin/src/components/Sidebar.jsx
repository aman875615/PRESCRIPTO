import React,{useContext} from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)

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
            <p>Dashboard</p>
          </NavLink>

          <NavLink className={linkClass} to="/all-appointments">
            <img className='w-5' src={assets.appointment_icon} alt="" />
            <p>Appointment</p>
          </NavLink>

          <NavLink className={linkClass} to="/add-doctor">
            <img className='w-5' src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-list">
            <img className='w-5' src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>

        </ul>
      )}

    </div>
  )
}

export default Sidebar