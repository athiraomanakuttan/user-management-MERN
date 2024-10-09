import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../redux/user/userSlice";
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [btnState, setBtnState] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/sign-out', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are included in the request
      });
      const data = await response.json();
      
      if (response.ok) {
       { dispatch(logoutSuccess())
        navigate('/login')
       }
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <div className="navbar-div w-[100%] bg-[#a59996ad] flex justify-between items-center p-3 pl-10 pr-10">
      <h1 className="font-extrabold text-4xl text-red-800">STD.</h1>
      <div className="flex gap-10">
        {btnState && (
          <ul className="flex gap-5 nav-link text-white">
            <Link
              to="/profile"
              className=" hover:underline hover:text-lg cursor-pointer transition-all"
            >
              Profile
            </Link>
            <p
              className=" hover:underline hover:text-lg cursor-pointer transition-all"
              onClick={handleLogout}
            >
              Sign out
            </p>
          </ul>
        )}

        {currentUser ? (
          <img
            src={currentUser.profilePic}
            alt=""
            className="w-8 rounded-full object-cover"
            onClick={() => setBtnState(!btnState)}
          />
        ) : (
          <i
            className="fa-solid fa-circle-user text-3xl text-white"
            onClick={() => setBtnState(!btnState)}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Navbar;
