
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

import nodemailer from 'nodemailer'

// Register API
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Login API
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials or Invalid password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get user profile data

const getProfile = async (req, res) => {
  try {

    const userId = req.userId

    const userData = await userModel
      .findById(userId)
      .select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//api to update progile 
const updateProfile = async (req,res)=>{
    try {
        
        const {name,phone,address,dob,gender} = req.body
        const userId = req.userId
        const imageFile = req.file

        if(!name || !phone || !dob || !gender ){
            return res.json({success:false,message:"Data Missing"})
        }
        
        await userModel.findByIdAndUpdate(req.userId,{name,phone,address:JSON.parse(address),dob,gender},{new: true})
        console.log(JSON.parse(address))
        console.log("UserId:", userId)
        console.log(name)

        if(imageFile){
            //upload image to cloudnary 
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})


        }
        res.json({success:true,message: "Profile Updated"})
                                      


    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
    
}



// API to book appointment 

const bookAppointment = async(req,res)=>{
    try {
        const { docId, slotDate, slotTime } = req.body

        const userId = req.userId
        
        console.log('Booking appointment - docId:', docId, 'userId:', userId)

        const docData = await doctorModel.findById(docId).select('-password')
        
        if(!docData){
            return res.json({success:false,message:'Doctor not found'})
        }

        if(!docData.available){
            return res.json({success:false,message:'Doctor not available'})
        }

        let slots_booked = docData.slots_booked
       
        // checking for slot availablity

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot  not available'})

            }else{
                slots_booked[slotDate].push(slotTime)
            }

        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId: userId.toString(),
            docId: docId.toString(),
            userData,
            docData,
            amount:docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        const savedAppointment = await newAppointment.save() //save the dataBase
        
        console.log('Appointment saved - docId type:', typeof savedAppointment.docId, 'docId value:', savedAppointment.docId)
        console.log('Full appointment:', JSON.stringify({docId: savedAppointment.docId, userId: savedAppointment.userId}))

        //save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
        console.log('Appointment Booked successfully')
        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//API to get user appointments for frontend my- appointment page

const listAppointment = async(req,res)=>{
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })
        
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}


//API to cancel appointment 
const cancelAppointment = async (req, res) => {

    try {

        const userId = req.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment user
        if (appointmentData.userId.toString() !== userId) {

            return res.json({
                success: false,
                message: 'You are not authorized to cancel this appointment'
            })

        }

        // Cancel appointment
        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { cancelled: true }
        )

        // Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData

        const docData = await doctorModel
            .findById(docId)
            .select('-password')

        let slots_booked = docData.slots_booked

        slots_booked[slotDate] =
            slots_booked[slotDate].filter(
                slot => slot !== slotTime
            )

        await doctorModel.findByIdAndUpdate(
            docId,
            { slots_booked }
        )

        res.json({
            success: true,
            message: 'Appointment Cancelled'
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}
      

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})  

//api to  make payment  of appontment using razopay

const paymentRazorpay = async(req,res)=>{

    try {
        const { appointmentId } = req.body
     const appointmentData = await appointmentModel.findById(appointmentId)

     if(!appointmentData || appointmentData.cancelled){
         return res.json({success:false,message:' Appointment cancelled or Invalid appointment'})

     }

     const options = {
         amount: appointmentData.amount * 100, // Amount in paise
         currency: process.env.CURRENCY,
         receipt: appointmentId
     }
     // Create Razorpay order
     const order = await razorpayInstance.orders.create(options)

     res.json({
    success: true,
    order
})
        
    } catch (error) {
        console.log(error)

            res.json({
                success: false,
                message: error.message
            })
    }

    

}

//api to verify payment of razorpay

const verifyRazorpayPayment = async(req,res)=>{
    
    try {
        const { razorpay_order_id  } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
           

        if(orderInfo.status === 'paid'){
             await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:'Payment Successful'})
        }else{
            res.json({success:false,message:'Payment Failed'})

        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

    }

    const sendMail = async(req,res)=>{
        try {
            const { email,name } = req.body

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD

                }
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "New message from Prescripto",
                text: `Welcome to Prescripto, ${name}!You have successfully registered on our platform. We are excited to have you on board and look forward to providing you with the best healthcare services. If you have any questions or need assistance, feel free to reach out to our support team. Thank you for choosing Prescripto!`
            }

            let mailSend = await transporter.sendMail(mailOptions)

            if(mailSend){
                res.json({success:true,message:'Email sent successfully'})
            }else{
                res.json({success:false,message:'Failed to send email'})
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: error.message
            })
        }
    }
                

        


export { registerUser, loginUser, getProfile, updateProfile ,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpayPayment,sendMail}    