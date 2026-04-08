import React, {useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const RelatedDoctor = ({speciality,docId}) => {

const {doctors} = useContext(AppContext)
const navigate=useNavigate()

const [relDoc,setRelDoc]=useState([])

useEffect(()=>{
    if(doctors.length >0 && speciality){
        const doctorData=doctors.filter((doc)=> doc.speciality===speciality  && doc._id !==docId )
        setRelDoc(doctorData)
    }
},[doctors,speciality,docId])

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
      
      <h1 className='text-3xl font-medium'>Related Doctors</h1>

      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>
        
        {relDoc.slice(0,5).map((item,index)=>(
          
          <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
          >
            
            <img src={item.image} alt={item.name} className='bg-blue-50 w-full'/>

            <div className='p-4'>
              
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p>Available</p>
              </div>

              <p className='text-gray-900 text-lg font-medium mt-2'>
                {item.name}
              </p>

              <p className='text-gray-600 text-sm'>
                {item.speciality}
              </p>

            </div>

          </div>

        ))}

      </div>

    

    </div>
  )
}

export default RelatedDoctor
