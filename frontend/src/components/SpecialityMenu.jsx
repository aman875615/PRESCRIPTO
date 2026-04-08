import React from 'react'
import { specialityData } from '../assets/assets'
import {Link} from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='specialists' className='flex flex-col items-center gap-4 py-16  text-gray-800'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm font-light'>
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
        </p>
        <div className='flex sm:justify-center flex-wrap gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item, index) => (
                <Link 
                key={index}
                onClick={()=>scrollTo(0,0)} 
                to={`/doctor/${item.speciality}`}  
                className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 gap-2 bg-stone-100 rounded-lg p-4 w-32 hover:scale-105 transition-all duration-300'>
                    <img className='w-16 sm:w-24 mb-2' src={item.image}  alt={item.speciality} />
                    <p className='text-sm font-medium'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
