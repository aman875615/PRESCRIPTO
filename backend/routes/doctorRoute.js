import express from 'express'
import authDoctor from '../middlewares/authDoctor.js'
import { doctorList ,loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,updateDoctorProfile,doctorProfile, sendDoctorResetOtp, verifyDoctorResetOtp, resetDoctorPassword} from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login', loginDoctor)  
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor)  
doctorRouter.post('/complete-appointment',authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor, appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor, doctorProfile)
doctorRouter.post('/update-profile',authDoctor, updateDoctorProfile)

doctorRouter.post('/send-reset-otp', sendDoctorResetOtp)
doctorRouter.post('/verify-reset-otp', verifyDoctorResetOtp)
doctorRouter.post('/reset-password', resetDoctorPassword)
        
export default doctorRouter