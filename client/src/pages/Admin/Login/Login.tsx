import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className='main-body bg-[#243642] w-100 h-[100vh] p-12'>
        <p className='text-end'>Hey Admin!</p>
      <div className="form-container mx-auto p-12 rounded-xl">
      <h1 className='mb-4'>Sign In </h1>

        <form action="" className='' autoComplete='off'>
            <input type="email" required placeholder='Email ID'/>
            <input type="password" required placeholder='Passwowrd'/>
            <button className='hover:bg-[#254d50]'>LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Login
