
import express from 'express'
import { loginUser, registerUser,getProfile ,updateProfile, bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpayPayment,sendMail} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/upload-profile', upload.single('image'),authUser, updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpayPayment)

userRouter.post('/sendmail',authUser,sendMail)

    



export default userRouter


