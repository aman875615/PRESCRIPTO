import React, { useState,useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import {  toast ,ToastContainer} from 'react-toastify';
import {DoctorContext} from '../context/DoctorContext'


const Login = () => {

    const [state,setState] = useState('Admin')

    const [email,setEmail] =useState('')
    const [password,setPassword]=useState('')

    // Doctor Password Reset State
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [resetStep, setResetStep] = useState(1) // 1: Email, 2: OTP, 3: Reset
    const [resetEmail, setResetEmail] = useState('')
    const [resetOtp, setResetOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        
        try {


            if(state==='Admin'){
                const  {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
                    if (data.success) {
                        setAToken(data.token)
                        localStorage.setItem("aToken", data.token)   
                    }
                    else{
                        toast.error(data.message)
                    }
            }
            else{
                    const { data } = await axios.post(backendUrl+'/api/doctor/login',{email,password})
                    if (data.success) {
                        setDToken(data.token)
                        localStorage.setItem("dToken", data.token)
                        console.log(data.token)
                    }
                    else{
                        toast.error(data.message)
                    }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleSendDoctorOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/send-reset-otp', { email: resetEmail })
            if (data.success) {
                toast.success(data.message)
                setResetStep(2)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyDoctorOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/verify-reset-otp', { email: resetEmail, otp: resetOtp })
            if (data.success) {
                toast.success(data.message)
                setResetStep(3)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleResetDoctorPassword = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match!")
        }
        setLoading(true)
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/reset-password', {
                email: resetEmail,
                otp: resetOtp,
                newPassword
            })
            if (data.success) {
                toast.success(data.message)
                setIsForgotPassword(false)
                setResetStep(1)
                setResetEmail('')
                setResetOtp('')
                setNewPassword('')
                setConfirmPassword('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    if (isForgotPassword) {
        return (
            <div className='min-h-[80vh] flex items-center w-full justify-center'>
                {resetStep === 1 && (
                    <form onSubmit={handleSendDoctorOtp} className='flex flex-col gap-3 p-8 w-full sm:w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                        <p className='text-2xl font-semibold m-auto'>Doctor <span className='text-[#5f6FFF]'>Reset</span> Password</p>
                        <p className='text-xs text-zinc-500 m-auto text-center'>Enter your registered email address to receive an OTP.</p>
                        
                        <div className='w-full mt-2'>
                            <p>Email Address</p>
                            <input
                                className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setResetEmail(e.target.value)}
                                value={resetEmail}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type='submit'
                            className='bg-[#5f6FFF] text-white w-full py-2.5 rounded-md text-base mt-2 hover:bg-[#4b58db] transition-colors disabled:bg-zinc-400'
                            disabled={loading}
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        <p className='mt-2 text-zinc-500 text-center'>
                            Remembered password?{' '}
                            <span
                                onClick={() => setIsForgotPassword(false)}
                                className='text-[#5f6FFF] underline cursor-pointer font-medium ml-1'
                            >
                                Login here
                            </span>
                        </p>
                    </form>
                )}

                {resetStep === 2 && (
                    <form onSubmit={handleVerifyDoctorOtp} className='flex flex-col gap-3 p-8 w-full sm:w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                        <p className='text-2xl font-semibold m-auto'>Verify <span className='text-[#5f6FFF]'>OTP</span></p>
                        <p className='text-xs text-zinc-500 m-auto text-center'>We have sent a 6-digit verification code to <span className='font-medium text-zinc-700'>{resetEmail}</span>.</p>
                        
                        <div className='w-full mt-2'>
                            <p>Enter 6-Digit OTP</p>
                            <input
                                className='border border-[#DADADA] rounded w-full p-2.5 mt-1 text-center font-mono text-lg tracking-[8px] focus:border-[#5f6FFF] focus:outline-none'
                                type="text"
                                maxLength="6"
                                placeholder="000000"
                                onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))}
                                value={resetOtp}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type='submit'
                            className='bg-[#5f6FFF] text-white w-full py-2.5 rounded-md text-base mt-2 hover:bg-[#4b58db] transition-colors disabled:bg-zinc-400'
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <div className='w-full flex justify-between mt-2 text-xs'>
                            <span 
                                onClick={() => setResetStep(1)} 
                                className='text-zinc-500 hover:text-[#5f6FFF] cursor-pointer'
                            >
                                ← Change Email
                            </span>
                            <span 
                                onClick={handleSendDoctorOtp} 
                                className='text-[#5f6FFF] font-medium hover:underline cursor-pointer'
                            >
                                Resend OTP
                            </span>
                        </div>
                    </form>
                )}

                {resetStep === 3 && (
                    <form onSubmit={handleResetDoctorPassword} className='flex flex-col gap-3 p-8 w-full sm:w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                        <p className='text-2xl font-semibold m-auto'>Reset <span className='text-[#5f6FFF]'>Password</span></p>
                        <p className='text-xs text-zinc-500 m-auto text-center'>Create a new strong password for your doctor account.</p>
                        
                        <div className='w-full mt-2'>
                            <p>New Password</p>
                            <input
                                className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
                                type="password"
                                placeholder="Min 8 characters"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className='w-full'>
                            <p>Confirm Password</p>
                            <input
                                className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
                                type="password"
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type='submit'
                            className='bg-[#5f6FFF] text-white w-full py-2.5 rounded-md text-base mt-2 hover:bg-[#4b58db] transition-colors disabled:bg-zinc-400'
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        )
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center w-full'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 w-full sm:w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'>
                <span className='text-[#5f6FFF]'>{state}</span>Login
            </p>

            <div className='w-full'>
                <p>Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
            
            {state === 'Doctor' && (
                <p 
                    onClick={() => setIsForgotPassword(true)}
                    className='text-xs text-[#5f6FFF] cursor-pointer hover:underline -mt-1 self-end'
                >
                    Forgot password?
                </p>
            )}

            <button className='bg-[#5f6FFF] text-white w-full py-2  rounded-md text-base mt-1'>Login</button>
            {
                state ==='Admin'
                ? <p>Doctor Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
                : <p>Admin Login? <span className='text-[#5f6FFF] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login

