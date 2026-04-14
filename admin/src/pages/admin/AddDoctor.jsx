import React,{useContext, useState} from 'react'
import { assets } from '../../assets/assets'
import {AdminContext} from '../../context/AdminContext'
import {toast } from 'react-toastify'
import axios from 'axios'


const AddDoctor = () => {

  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('General physician')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')

  const { backendUrl,aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event)=> {
    event.preventDefault()

      try {
        if(!docImg){
          return toast.error('Image not selected')
        }
        const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append(
        'address',
        JSON.stringify({
          line1: address1,
          line2: address2
        })
      )

        // console log formData
      formData.forEach((key,value)=>{
        console.log(`${key} : ${value}`)
      })
      console.log("Backend URL:", backendUrl)
      console.log("Token:", aToken)

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    
  }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">

      <p className="mb-5 text-lg font-semibold">Add Doctor</p>

      <div className="bg-white px-6 py-6 border rounded-lg max-w-4xl">

        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img  className="w-16 h-16 object-cover border rounded-full p-2"
              src={ docImg ? URL.createObjectURL(docImg)  : assets.upload_img} alt=""
            />
          </label>

          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />

          <p className="text-gray-600">
            Upload doctor <br /> picture
          </p>
        </div>


        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="flex flex-col">
            <p className="mb-1">Doctor Name</p>
            <input
              onChange={(e)=>setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Name"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Doctor Email</p>
            <input
             onChange={(e)=>setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Password</p>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Experience</p>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2">

              <option>1 Year</option>
              <option>2 Year</option>
              <option>3 Year</option>
              <option>4 Year</option>
              <option>5 Year</option>
              <option>6 Year</option>
              <option>7 Year</option>
              <option>8 Year</option>
              <option>9 Year</option>
              <option>10 Year</option>

            </select>
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Fees</p>
            <input
              onChange={(e)=>setFees(e.target.value)}
              type="number"
              value={fees}
              placeholder="Fees"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2">

              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>

            </select>
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Education</p>
            <input
              onChange={(e)=>setDegree(e.target.value)}
              type="text"
              value={degree}
              placeholder="Education"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-1">Address</p>
            <input
              onChange={(e)=>setAddress1(e.target.value)}
              type="text"
              value={address1}
              placeholder="Address line 1"
              className="border rounded px-3 py-2 mb-2"
            />
            <input
              onChange={(e)=>setAddress2(e.target.value)}
              type="text"
              value={address2}
              placeholder="Address line 2"
              className="border rounded px-3 py-2"
            />
          </div>

        </div>


        {/* About */}
        <div className="flex flex-col mt-5">
          <p className="mb-1">About Doctor</p>
          <textarea
            onChange={(e)=>setAbout(e.target.value)}
            rows="4"
            value={about}
            placeholder="Write about doctor"
            className="border rounded px-3 py-2"
          />
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>

      </div>

    </form>
  )
}

export default AddDoctor