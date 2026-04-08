import React from 'react'
import {assets} from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=React.useState(false); 
    const [token,setToken]=React.useState(true);
  return (
    <div className='flex items-center justify-between py-4 mb-5 border-b-gray-400 '>
            <img  onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
            <ul  className='hidden md:flex itema-start gap-5 text-lg font-medium'>
                <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/doctor" className={({isActive}) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to="/contact" className={({isActive}) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""}>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
        <div className="">
            {
            token
            ?   <div className='flex items-center gap-2 cursor-pointer group relative'> 
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0  pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/appointments')} className='hover:text-black cursor-pointer' >Appointments</p>
                            <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>

            : <button onClick={()=>navigate('/login')} className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium">Create Account</button>

            }
        </div>
      
    </div>
  )
}

export default Navbar
