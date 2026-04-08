import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'

const dayOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)

  const [docInfo,setDocInfo] = useState(null)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')



  // fetch doctor info
  const fetchDocInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }



  // generate slots
  const getAvailableSlots = () => {

    let today = new Date()
    let allSlots = []

    for(let i = 0; i < 7; i++){

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      if(i === 0){
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime){

        let formattedTime = currentDate.toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit'
        })

        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }



  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])



  useEffect(()=>{
    if(docInfo){
      getAvailableSlots()
    }
  },[docInfo])



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

          <p className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="" />
          </p>

          <div>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>


          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About
              <img src={assets.info_icon} alt="" />
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



      {/* Booking Slots */}

      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-6'>

        <p>Booking slots</p>


        {/* Days */}

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>

          {docSlots.map((item,index)=>{

            const date = new Date()
            date.setDate(date.getDate() + index)

            return(
              <div
                key={index}
                onClick={()=>setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer border
                ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border-gray-200'}`}
              >

                <p>{dayOfWeek[date.getDay()]}</p>
                <p>{date.getDate()}</p>

              </div>
            )

          })}

        </div>



        {/* Time Slots */}

        <div className="flex gap-3 overflow-x-auto mt-4">

          {docSlots[slotIndex]?.map((item,index)=>(
            
              <div
                key={index}
                onClick={()=>setSlotTime(item.time)}
                className={`min-w-[100px] text-center py-2 rounded-full border cursor-pointer
                ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'border-gray-300'}`}
              >
                {item.time.toLowerCase()}
              </div>

            ))}

        </div>
        <button 
        className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>


      </div>
      <RelatedDoctor  docId={docId} speciality={docInfo.speciality}/>

    </div>
  )

}

export default Appointment