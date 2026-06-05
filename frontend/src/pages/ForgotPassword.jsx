import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/send-reset-otp', { email })
      if (data.success) {
        toast.success(data.message)
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/verify-reset-otp', { email, otp })
      if (data.success) {
        toast.success(data.message)
        setStep(3)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!")
    }
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/reset-password', {
        email,
        otp,
        newPassword
      })
      if (data.success) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center px-4 sm:px-0 justify-center w-full'>
      
      {step === 1 && (
        <form onSubmit={handleSendOtp} className='flex flex-col gap-3 m-auto items-start p-6 sm:p-8 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg transition-all duration-300'>
          <p className='text-2xl font-semibold text-zinc-800'>Forgot Password</p>
          <p className='text-zinc-500'>Enter your registered email address to receive an OTP.</p>
          
          <div className='w-full mt-2'>
            <p className='font-medium'>Email Address</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

          <p className='mt-2 text-zinc-500'>
            Remembered password?{' '}
            <span
              onClick={() => navigate('/login')}
              className='text-[#5f6FFF] underline cursor-pointer font-medium ml-1'
            >
              Login here
            </span>
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className='flex flex-col gap-3 m-auto items-start p-6 sm:p-8 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg transition-all duration-300'>
          <p className='text-2xl font-semibold text-zinc-800'>Verify OTP</p>
          <p className='text-zinc-500'>We have sent a 6-digit verification code to <span className='font-medium text-zinc-700'>{email}</span>.</p>
          
          <div className='w-full mt-2'>
            <p className='font-medium'>Enter 6-Digit OTP</p>
            <input
              className='border border-zinc-300 rounded w-full p-2.5 mt-1 text-center font-mono text-lg tracking-[8px] focus:border-[#5f6FFF] focus:outline-none'
              type="text"
              maxLength="6"
              placeholder="000000"
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              value={otp}
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
              onClick={() => setStep(1)} 
              className='text-zinc-500 hover:text-[#5f6FFF] cursor-pointer'
            >
              ← Change Email
            </span>
            <span 
              onClick={handleSendOtp} 
              className='text-[#5f6FFF] font-medium hover:underline cursor-pointer'
            >
              Resend OTP
            </span>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className='flex flex-col gap-3 m-auto items-start p-6 sm:p-8 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg transition-all duration-300'>
          <p className='text-2xl font-semibold text-zinc-800'>Reset Password</p>
          <p className='text-zinc-500'>Create a new strong password for your account.</p>
          
          <div className='w-full mt-2'>
            <p className='font-medium'>New Password</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
              type="password"
              placeholder="Min 8 characters"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
              disabled={loading}
            />
          </div>

          <div className='w-full'>
            <p className='font-medium'>Confirm Password</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1 focus:border-[#5f6FFF] focus:outline-none'
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

export default ForgotPassword
