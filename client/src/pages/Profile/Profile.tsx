import React, { useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailed,updateUserStart,updateUserSuccess } from "../../../redux/user/userSlice";
import { Link } from "react-router-dom";
type formDataType = {
  profilePic: any;
  userName: string;
  userEmail: string;
  newPassword: string;
  confirmPassword: string;
};
const dispach = useDispatch()
const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState<formDataType>({
    profilePic: currentUser.profilePic,
    userName: currentUser.userName,
    userEmail: currentUser.userEmail,
    newPassword: "",
    confirmPassword: ""
  });
const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name,value} = e.target
  setFormData({
    ...formData,
    [name]:value
  })
}
const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  dispach(updateUserStart())
 try
 {
  const res = await fetch('http://localhost:8000/api/user/updateUser',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify(formData)
  })
  const data = await res.json()
  if(!res.ok)
  {
    dispach(updateUserFailed("Something went wrong Try Again"))
  }
  else
  dispach(updateUserSuccess(data))
 }
 catch(err)
 {
    dispach(updateUserFailed(err))
 }
}
  return (
    <div className="profile-div w-[100%] flex m-12">
      <Link to='/'><i className="fa-solid fa-circle-arrow-left  back-icon"></i></Link>

      <form className="profile-form mx-auto border w-[50%] p-10 bg-[#eee3e0f1] " onSubmit={handleSubmit}>
        {/* Profile Image Container with hover edit */}
        <div className="profile-pic-container relative">
          <img src={formData.profilePic} alt="Profile" className="w-36 self-center profile-icon mx-auto" />
          <div className="edit-overlay absolute inset-0 flex items-center justify-center   bg-opacity-50 opacity-0 hover:opacity-100">
            <button className="edit-btn text-white"><i className="fa-solid fa-pen"></i></button>
          </div>
        </div>

        <p>Display Name</p>
        <input type="text" name="userName" required value={formData.userName} onChange={handleChange}/>
        <p>Email Id</p>
        <input type="email" name="userEmail" disabled required value={formData.userEmail} onChange={handleChange}/>
        <p>New Password</p>
        <input type="password" name="newPassword" required value={formData.newPassword} onChange={handleChange}/>
        <p>Confirm Passoword</p>
        <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}/>

        <div className="btn-section flex items-center justify-between">
          <button className="bg-red-700 p-2 text-white">Delete account</button>
          <button className="bg-yellow-400 p-2" type="submit">Save Change</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
