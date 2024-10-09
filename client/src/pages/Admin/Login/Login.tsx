import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLoginFailed, adminLoginStart ,adminLoginSuccess } from '../../../../redux/admin/adminSlice'
import { toast } from 'react-toastify'
type formDataType= {
    email: string,
    password: string
}
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData,setFormData]= useState<formDataType>({
        email:"",
        password:""
    })
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
            const { name, value} = e.target
            setFormData({
                ...formData,
                [name]: value
            })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(adminLoginStart());
    
        try {
            const res = await fetch('http://localhost:8000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensure your server supports this for cookies
                body: JSON.stringify(formData),
            });
    
            const data = await res.json(); // Parse the response
    
            if (!res.ok) {
                // Handle error response, send meaningful error message
                dispatch(adminLoginFailed(data?.message || 'Login failed'));
                toast.error(data?.message || "Login failed");
            } else {
                // On success, dispatch login success and navigate
                dispatch(adminLoginSuccess(data));
                toast.success("Successfully logged in");
                navigate('/admin/home');
            }
        } catch (err: any) {
            // Handle unexpected errors, e.g., network errors
            toast.error("Something went wrong");
            dispatch(adminLoginFailed(err.message || "Something went wrong"));
        }
    };
    
  return (
    <div className='main-body bg-[#243642] w-100 h-[100vh] p-12'>
        <p className='text-end'>Hey Admin!</p>
      <div className="form-container mx-auto p-12 rounded-xl">
      <h1 className='mb-4'>Sign In </h1>

        <form action="" className='' autoComplete='off' onSubmit={handleSubmit}>
            <input type="email" required placeholder='Email ID'  onChange={handleInput} name='email' value={formData.email}/>
            <input type="password" required placeholder='Passwowrd' onChange={handleInput} name='password' value={formData.password}/>
            <button className='hover:bg-[#254d50]' type='submit'> LOGIN </button>
        </form>
      </div>
    </div>
  )
}

export default Login
