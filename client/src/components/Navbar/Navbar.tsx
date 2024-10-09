import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
const Navbar = () => {
  const [btnState, setBtnState] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.user);

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
            <Link
              to="/sign-out"
              className=" hover:underline hover:text-lg cursor-pointer transition-all"
            >
              Sign out
            </Link>
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
