import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'



const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=React.useState(false); 
    const { token ,setToken} =useContext(AppContext)
    const logout = ()=>{
      setToken(false)
      localStorage.removeItem('token')
    }




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
        <div className="flex items-center gap-4">
            {
            token
            ?   <div className='flex items-center gap-2 cursor-pointer group relative'> 
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0  pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/appointments')} className='hover:text-black cursor-pointer' >Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>

            : <button onClick={()=>navigate('/login')} className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium">Create Account</button>

            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* -----------------MobileMenu------------------ */}
            <div className={`fixed md:hidden top-0 right-0 h-full w-64 bg-white z-20 transform transition-transform duration-300 ${
                    showMenu ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>

                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

  <NavLink 
    onClick={()=>setShowMenu(false)} 
    to='/' 
    className={({isActive}) => 
      isActive ? "px-4 py-2 rounded inline-block bg-blue-500 text-white" : "px-4 py-2 rounded inline-block"
    }
  >
    Home
  </NavLink>

  <NavLink 
    onClick={()=>setShowMenu(false)} 
    to='/doctor'
    className={({isActive}) => 
      isActive ? "px-4 py-2 rounded inline-block bg-blue-500 text-white" : "px-4 py-2 rounded inline-block"
    }
  >
    ALL Doctors
  </NavLink>

  <NavLink 
    onClick={()=>setShowMenu(false)} 
    to='/about'
    className={({isActive}) => 
      isActive ? "px-4 py-2 rounded inline-block bg-blue-500 text-white" : "px-4 py-2 rounded inline-block"
    }
  >
    About
  </NavLink>

  <NavLink 
    onClick={()=>setShowMenu(false)} 
    to='/contact'
    className={({isActive}) => 
      isActive ? "px-4 py-2 rounded inline-block bg-blue-500 text-white" : "px-4 py-2 rounded inline-block"
    }
  >
    Contact
  </NavLink>

</ul>

            </div>
        </div>
      
    </div>
  )
}

export default Navbar
