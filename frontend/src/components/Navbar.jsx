import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = React.useState(false);

    const { token, setToken, userData } = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between py-4 mb-5 border-b border-gray-300'>

            {/* Logo */}
            <img
                onClick={() => navigate('/')}
                className='w-44 cursor-pointer'
                src={assets.logo}
                alt=""
            />

            {/* Desktop Menu */}
            <ul className='hidden md:flex items-center gap-5 text-lg font-medium'>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
                    }
                >
                    <li className='py-1'>HOME</li>
                </NavLink>

                <NavLink
                    to="/doctor"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
                    }
                >
                    <li className='py-1'>ALL DOCTORS</li>
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
                    }
                >
                    <li className='py-1'>ABOUT</li>
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
                    }
                >
                    <li className='py-1'>CONTACT</li>
                </NavLink>

                {/* Admin Panel Button */}
                <button
                    onClick={() => window.open('https://prescripto-admin-x8ex.onrender.com', '_blank')}
                    className='border border-gray-300 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition'
                >
                    Admin Panel
                </button>

            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {
                    token && userData
                        ? (
                            <div className='flex items-center gap-2 cursor-pointer group relative'>

                                <img
                                    className='w-8 rounded-full'
                                    src={userData.image}
                                    alt=""
                                />

                                <img
                                    className='w-2.5'
                                    src={assets.dropdown_icon}
                                    alt=""
                                />

                                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

                                        <p
                                            onClick={() => navigate('/my-profile')}
                                            className='hover:text-black cursor-pointer'
                                        >
                                            My Profile
                                        </p>

                                        <p
                                            onClick={() => navigate('/my-appointments')}
                                            className='hover:text-black cursor-pointer'
                                        >
                                            My Appointments
                                        </p>

                                        <p
                                            onClick={logout}
                                            className='hover:text-black cursor-pointer'
                                        >
                                            Logout
                                        </p>

                                    </div>
                                </div>

                            </div>
                        )
                        : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium"
                            >
                                Create Account
                            </button>
                        )
                }

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => setShowMenu(true)}
                    className='w-6 md:hidden'
                    src={assets.menu_icon}
                    alt=""
                />

                {/* Mobile Menu */}
                <div
                    className={`fixed md:hidden top-0 right-0 h-full w-64 bg-white z-20 transform transition-transform duration-300 ${
                        showMenu ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >

                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img
                            className='w-7'
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt=""
                        />
                    </div>

                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to='/'
                            className='px-4 py-2 rounded'
                        >
                            Home
                        </NavLink>

                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to='/doctor'
                            className='px-4 py-2 rounded'
                        >
                            ALL DOCTORS
                        </NavLink>

                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to='/about'
                            className='px-4 py-2 rounded'
                        >
                            About
                        </NavLink>

                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to='/contact'
                            className='px-4 py-2 rounded'
                        >
                            Contact
                        </NavLink>

                        <button
                            onClick={() => {
                                setShowMenu(false)
                                window.open('https://prescripto-admin-x8ex.onrender.com', '_blank')
                            }}
                            className='px-4 py-2 rounded'
                        >
                            Admin Panel
                        </button>

                    </ul>

                </div>

            </div>

        </div>
    )
}

export default Navbar