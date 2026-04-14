import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage.jsx'
import Doctor from './pages/Doctor'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from './components/Footer.jsx'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const App = () => {
  return (
    <div className='ma-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/doctor/:speciality' element={<Doctor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
