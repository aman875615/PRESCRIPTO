import React,{useState} from 'react'

const Login = () => {

  const [state,setState]=useState('Sign Up')
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')

  const onSubmitHandler= async (event)=>{
    event.perventDefault()

  }


  return (
    <form action=""  className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 test-sm shadow-lg'>
        <p  className='text-2xl font-semibold'>{state==='Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state==='Sign Up' ? "sign up" : "log in"} to book appointment</p>

        {
          state=== 'Sign Up'   &&
           <div className='w-full'>
             <p>Full Name</p>
             <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onClick={(e)=>setName(e.target.name)} value={name} />
        </div>
        }

        

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onClick={(e)=>setEmail(e.target.email)} value={email} />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onClick={(e)=>setPassword(e.target.password)} value={password} />
        </div>
        <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>{state ==='Sign Up' ? "Create Account" : "Login"}</button>

        {
          state==='Sign Up' 
          ? <p>Already have an account? <span  onClick={()=>setState('login')}className='text-[#5f6FFF] underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span  onClick={()=>setState('sign Up')}className='text-[#5f6FFF] underline cursor-pointer'>click here</span></p>
        }

      </div>
    </form>
  )
}

export default Login
