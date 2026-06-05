
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const changeAvailability = async (req,res) =>{

    try {
        
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Availability Changed'})


 } catch (error){ 
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req,res)=> {

        try {
            const doctors = await doctorModel.find({}).select(['-password','-email'])
            res.json({success:true,doctors})

        } catch (error) {
             console.log(error)
             res.json({success:false, message:error.message})
        }

}

 const loginDoctor = async (req,res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false, message:'Doctor not found'})
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            doctor.token = token
            await doctor.save()
            return res.json({success:true, token})
        }else{
            return res.json({success:false, message:'Invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to get doctor appointments for doctor panel

const appointmentsDoctor = async (req,res) => {
    try {
        const docId = String(req.docId).trim()
        console.log('Fetching appointments - docId:', docId, 'type:', typeof docId)
        
        const appointments = await appointmentModel.find({
            docId: docId
        }).lean()
        
        console.log('Query result - appointments found:', appointments.length)
        if(appointments.length > 0){
            console.log('First appointment docId:', appointments[0].docId)
        }
        
        res.json({success:true, appointments: appointments.reverse()})
    }
    catch (error) {
        console.log('Error in appointmentsDoctor:', error)
        res.json({success:false, message:error.message})
    }

}

//api to mark appointment cpmlete  fo doctor panel

const appointmentComplete = async (req,res) => {
    try {
        const {appointmentId} = req.body
        const docId = req.docId
        
       const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId.toString() === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true, message:'Appointment completed'}) 

        }

       else{
        return res.json({success:false, message:'Appointment not found or unauthorized'})
       }
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to cancel appointment  fo doctor panel

const appointmentCancel = async (req,res) => {
    try {
        const {appointmentId} = req.body
        const docId = req.docId
        
       const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId.toString() === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true, message:'Appointment cancelled'}) 

        }

       else{
        return res.json({success:false, message:'Cancel failed. Appointment not found or unauthorized'})

       }
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to get doctor dashboard data fore doctor panel

const  doctorDashboard = async (req,res) => {

    try {
        const docId  = req.docId
        const appointments = await appointmentModel.find({docId})
         let earnings=0;
         appointments.map(item => {
            if(item.isCompleted  || item.cancelled  )  
             earnings += item.amount;
         })
         let patients = []
            appointments.map(item => {
                if(!patients.includes(item.userId)){
                    patients.push(item.userId)
                }
            })

            const dashData = {
                earnings,
                appointments: appointments.length,
                 patients: patients.length,
                 latestAppointments: appointments.reverse().slice(0, 5) // Get the latest 5 appointments

            }
        res.json({success:true, dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to get docrtor profile for doctor proffile

const doctorProfile = async (req,res) => {
    try {
        const docId = req.docId
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({success:true, profileData})
    }

    catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//api to update to doctor profile for doctor proffile
const updateDoctorProfile = async (req,res) => {
    try {
        
        const {fees,address,available} = req.body
        const docId = req.docId

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
        res.json({success:true, message:'Profile updated successfully'})
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const sendDoctorResetOtp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.json({ success: false, message: "Email is required" })
        }

        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found with this email" })
        }

        // Generate 6-digit random OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        // Set OTP and expiration (10 minutes)
        doctor.resetOtp = otp
        doctor.resetOtpExpire = Date.now() + 10 * 60 * 1000
        await doctor.save()

        // Configure Nodemailer transporter
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
            subject: "Doctor Password Reset OTP - Prescripto",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #5f6FFF; text-align: center;">Prescripto Doctor Password Reset</h2>
                    <p>Hello Dr. ${doctor.name},</p>
                    <p>You requested a password reset. Please use the following One-Time Password (OTP) to reset your password:</p>
                    <div style="background-color: #f4f6f9; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">
                        ${otp}
                    </div>
                    <p style="color: #ff3333; font-size: 13px; margin-top: 15px;">Note: This OTP is valid for 10 minutes only. Do not share this OTP with anyone.</p>
                    <br/>
                    <p>Regards,<br/>Team Prescripto</p>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "OTP sent successfully to your email" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyDoctorResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.json({ success: false, message: "Email and OTP are required" })
        }

        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }

        if (doctor.resetOtp === "" || String(doctor.resetOtp).trim() !== String(otp).trim()) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        if (doctor.resetOtpExpire < Date.now()) {
            return res.json({ success: false, message: "OTP expired. Please request a new one." })
        }

        res.json({ success: true, message: "OTP verified successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const resetDoctorPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body

        if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: "Missing required details" })
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" })
        }

        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }

        if (doctor.resetOtp === "" || String(doctor.resetOtp).trim() !== String(otp).trim()) {
            return res.json({ success: false, message: "Invalid OTP verification" })
        }

        if (doctor.resetOtpExpire < Date.now()) {
            return res.json({ success: false, message: "OTP expired" })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update password and clear OTP
        doctor.password = hashedPassword
        doctor.resetOtp = ""
        doctor.resetOtpExpire = null
        await doctor.save()

        res.json({ success: true, message: "Password reset successfully. You can now login with your new password." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { 
    changeAvailability,
    doctorList,
    loginDoctor,
    appointmentsDoctor, 
    appointmentComplete, 
    appointmentCancel, 
    doctorDashboard,
    doctorProfile, 
    updateDoctorProfile,
    sendDoctorResetOtp,
    verifyDoctorResetOtp,
    resetDoctorPassword
}