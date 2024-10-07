import  { useEffect, useState } from "react";
type icon = { value: string}
import googleIcon from '../../assets/google-icon.webp'
import loadingIcon from '../../assets/loading.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form.css'
import { json } from "react-router-dom";
type formData={
  userName:string;
  userEmail: string;
  password: string;
  confirmPassword : string;
}
const Form = () => {
  const [formData, setFormData]=  useState<formData>({
    userName :"",
    userEmail: "",
    password : "",
    confirmPassword : ""
  })

  const [loading,setLoading] = useState<Boolean>(false)
  const [error,setError] = useState<string>("")
useEffect(()=>{
  toast("Wow so easy!")
},[])

const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault();
  setFormData({
    ...formData,
    [e.target.name] : e.target.value
  })
}

const handleSUbmit = async (e :React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  setLoading(true)
  toast("Wow so easy!")
 try{
  const res = await fetch('http://localhost:8000/api/user/signup',{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  });
  const data = res.json()
  setLoading(false)
  setError("")

 }
 catch(error){
    setLoading(false)
    const errorMessage = (error as Error).message ? (error as Error).message : "Some error occurred";
    setError(errorMessage)
 }
}
  return (
    <div>
      <form action="" className="signUp-form" autoComplete="off" onSubmit={handleSUbmit}>
        <input type="text"  name="userName" required onChange={handleInput} placeholder="Full Name" value={formData.userName} />
        <input type="email" name="userEmail" required onChange={handleInput} placeholder="Email ID"  value={formData.userEmail} />
        <input type="password" name="password" required onChange={handleInput} placeholder="Password"  value={formData.password} />
        <input type="password" name="confirmPassword" required onChange={handleInput} placeholder="Confirm Password"  value={formData.confirmPassword}/>
        <button className="signup-btn bg-red-800 text-white" >{loading ? <img src={loadingIcon} className="inline w-6" />: "Sign Up"}</button>
        <button className="signup-google-btn"><img src={googleIcon} alt="" className="w-10 inline" />Signup with google</button>
      </form>
    </div>
  );
};

export default Form;
