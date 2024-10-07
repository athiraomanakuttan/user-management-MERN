import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData]=  useState({
    userName :"",
    userEmail: "",
    password : "",
    confirmPassword : ""
  })
const handleInput = ()=>{
  
}
  return (
    <div>
      <form action="">
        <input type="text"  name="userName" required onChange={handleInput} placeholder="Full Name"/>
        <input type="email" name="userEmail" required onChange={handleInput} placeholder="Email ID"/>
        <input type="password" name="userPassword" required onChange={handleInput} placeholder="Password"/>
        <input type="password" name="confirmPassword" required onChange={handleInput} placeholder="Confirm Password"/>
        <button>Sign Up</button>
        <button>SIgnup with google</button>
      </form>
    </div>
  );
};

export default Form;
