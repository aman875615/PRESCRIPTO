// import React, { useContext, useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedDoctor from '../components/RelatedDoctor'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

// const Appointment = () => {

//   const { docId } = useParams()
//   const { doctors, currencySymbol,getDoctorsData,backendUrl,token } = useContext(AppContext)
//   const navigate = useNavigate()
//   const [docInfo,setDocInfo] = useState(null)
//   const [docSlots,setDocSlots] = useState([])
//   const [slotIndex,setSlotIndex] = useState(0)
//   const [slotTime,setSlotTime] = useState('')



//   // fetch doctor info
//   const fetchDocInfo = () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)
//   }



//   // generate slots
//   const getAvailableSlots = () => {

//     let today = new Date()
//     let allSlots = []

//     for(let i = 0; i < 7; i++){

//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       let endTime = new Date(today)
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21,0,0,0)

//       if(i === 0){
//         currentDate.setHours(
//           currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10
//         )
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       }
//       else{
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []

//       while(currentDate < endTime){

//         let formattedTime = currentDate.toLocaleTimeString([],{
//           hour:'2-digit',
//           minute:'2-digit'
//         })

//         const day = currentDate.getDate()
//         const month = currentDate.getMonth() + 1
//         const year = currentDate.getFullYear()

//         const slotDate = day + '-' + month + '-' + year
//         const slotTime = formattedTime.toLowerCase()

//        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

//           if(isSlotAvailable){
//             timeSlots.push({
//             datetime:new Date(currentDate),
//             time:formattedTime
//             })

//           } 

//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       allSlots.push(timeSlots)
//     }

//     setDocSlots(allSlots)
//   }

//  const bookAppointment = async () => {

//   if (!token) {
//     toast.warn('Login to book appointment')
//     return navigate('/login')
//   }

//   if (!slotTime) {
//     return toast.warn('Please select a time slot')
//   }

//   try {

//     // Find selected slot
//     const date = docSlots[slotIndex].find(
//       item => item.time === slotTime
//     )?.datetime

//     if (!date) {
//       return toast.error('Invalid slot selected')
//     }

//     let day = date.getDate()
//     let month = date.getMonth() + 1
//     let year = date.getFullYear()

//     const slotDate = day + '-' + month + '-' + year

//     const {data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId,slotTime,slotDate }  , {headers : {token}})
//     if(data.success){
//       toast.success(data.message)
//       getDoctorsData()
//       navigate('/my-appointments')
      
//     }
//     else{
//        toast.error(data.message)
//     }

//   } catch (error) {

//     console.log(error)
//     return  toast.error(error.response?.data?.message || 'Error occurred while booking appointment')
  

//   }
// }

//   useEffect(()=>{
//     fetchDocInfo()
//   },[doctors,docId])



//   useEffect(()=>{
//     if(docInfo){
//       getAvailableSlots()
//     }
//   },[docInfo])



//   return docInfo && (

//     <div>

//       {/* Doctor Details */}

//       <div className='flex flex-col sm:flex-row gap-4'>

//         <div>
//           <img
//             className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg'
//             src={docInfo.image}
//             alt=""
//           />
//         </div>


//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white'>

//           <p className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             {docInfo.name}
//             <img src={assets.verified_icon} alt="" />
//           </p>

//           <div>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>
//               {docInfo.experience}
//             </button>
//           </div>


//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About
//               <img src={assets.info_icon} alt="" />
//             </p>

//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
//               {docInfo.about}
//             </p>
//           </div>

//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee :
//             <span className='text-gray-600'>
//               {currencySymbol}{docInfo.fees}
//             </span>
//           </p>

//         </div>

//       </div>



//       {/* Booking Slots */}

//       <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-6'>

//         <p>Booking slots</p>


//         {/* Days */}

//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>

//           {docSlots.map((item,index)=>{

//             const date = new Date()
//             date.setDate(date.getDate() + index)

//             return(
//               <div
//                 key={index}
//                 onClick={()=>setSlotIndex(index)}
//                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer border
//                 ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border-gray-200'}`}
//               >

//                 <p>{dayOfWeek[date.getDay()]}</p>
//                 <p>{date.getDate()}</p>

//               </div>
//             )

//           })}

//         </div>



//         {/* Time Slots */}

//         <div className="flex gap-3 overflow-x-auto mt-4">

//           {docSlots[slotIndex]?.map((item,index)=>(
            
//               <div
//                 key={index}
//                 onClick={()=>setSlotTime(item.time)}
//                 className={`min-w-[100px] text-center py-2 rounded-full border cursor-pointer
//                 ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'border-gray-300'}`}
//               >
//                 {item.time.toLowerCase()}
//               </div>

//             ))}

//         </div>
//         <button 
//         onClick={bookAppointment}
//         className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>


//       </div>
//       <RelatedDoctor  docId={docId} speciality={docInfo.speciality}/>

//     </div>
//   )

// }

// export default Appointment



import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'

const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {

  const { docId } = useParams()

  const {
    doctors,
    currencySymbol,
    getDoctorsData,
    backendUrl,
    token
  } = useContext(AppContext)

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')



  // Fetch doctor info

  const fetchDocInfo = () => {

    const doctorInfo = doctors.find(
      doc => doc._id === docId
    )

    setDocInfo(doctorInfo)

  }



  // Generate available slots

  const getAvailableSlots = () => {

    if (!docInfo) return

    let today = new Date()

    let allSlots = []

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)

      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)

      endTime.setDate(today.getDate() + i)

      endTime.setHours(21, 0, 0, 0)



      // Today timing

      if (i === 0) {

        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        )

        currentDate.setMinutes(
          currentDate.getMinutes() > 30
            ? 30
            : 0
        )

      } else {

        currentDate.setHours(10)
        currentDate.setMinutes(0)

      }

      let timeSlots = []

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })



        // Format Date

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '-' + month + '-' + year

        const slotTime = formattedTime.toLowerCase()



        // Check slot availability

        const isSlotAvailable =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true



        if (isSlotAvailable) {

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }

        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        )

      }

      allSlots.push(timeSlots)

    }

    setDocSlots(allSlots)

  }



  // Book appointment

  const bookAppointment = async () => {

    if (!token) {

      toast.warn('Login to book appointment')

      return navigate('/login')

    }

    if (!slotTime) {

      return toast.warn('Please select time slot')

    }

    try {

      const date = docSlots[slotIndex].find(
        item => item.time === slotTime
      )?.datetime

      if (!date) {

        return toast.error('Invalid slot selected')

      }

      let day = date.getDate()

      let month = date.getMonth() + 1

      let year = date.getFullYear()

      const slotDate = day + '-' + month + '-' + year



      const { data } = await axios.post(

        backendUrl + '/api/user/book-appointment',

        {
          docId,
          slotDate,
          slotTime
        },

        {
          headers: { token }
        }

      )



      if (data.success) {

        toast.success(data.message)

        getDoctorsData()

        navigate('/my-appointments')

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )

    }

  }



  useEffect(() => {

    fetchDocInfo()

  }, [doctors, docId])



  useEffect(() => {

    if (docInfo) {

      getAvailableSlots()

    }

  }, [docInfo])



  return docInfo && (

    <div>

      {/* Doctor Details */}

      <div className='flex flex-col sm:flex-row gap-4'>

        <div>

          <img
            className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg'
            src={docInfo.image}
            alt=""
          />

        </div>



        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white'>

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>

            {docInfo.name}

            <img
              className='w-5'
              src={assets.verified_icon}
              alt=""
            />

          </p>



          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>

            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>

          </div>



          <div>

            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>

              About

              <img
                src={assets.info_icon}
                alt=""
              />

            </p>

            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>

              {docInfo.about}

            </p>

          </div>



          <p className='text-gray-500 font-medium mt-4'>

            Appointment fee :

            <span className='text-gray-600'>

              {currencySymbol}{docInfo.fees}

            </span>

          </p>

        </div>

      </div>



      {/* Slots */}

      <div className='sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700'>

        <p>Booking slots</p>



        {/* Days */}

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>

          {
            docSlots.map((item, index) => {

              const date = new Date()

              date.setDate(date.getDate() + index)

              return (

                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer border 
                  ${slotIndex === index
                      ? 'bg-[#5f6FFF] text-white'
                      : 'border-gray-200'
                    }`}
                >

                  <p>{dayOfWeek[date.getDay()]}</p>

                  <p>{date.getDate()}</p>

                </div>

              )

            })
          }

        </div>



        {/* Time */}

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>

          {
            docSlots[slotIndex]?.map((item, index) => (

              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
                ${item.time === slotTime
                    ? 'bg-[#5f6FFF] text-white'
                    : 'text-gray-400 border border-gray-300'
                  }`}
              >

                {item.time.toLowerCase()}

              </p>

            ))
          }

        </div>



        <button
          onClick={bookAppointment}
          className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6'
        >

          Book an Appointment

        </button>

      </div>



      <RelatedDoctor
        docId={docId}
        speciality={docInfo.speciality}
      />

    </div>

  )

}

export default Appointment