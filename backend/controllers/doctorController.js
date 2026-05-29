
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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



export { changeAvailability ,
    doctorList,
     loginDoctor,
     appointmentsDoctor, appointmentComplete, 
     appointmentCancel, doctorDashboard,
     doctorProfile, updateDoctorProfile
    }