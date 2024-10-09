import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailed, updateUserStart, updateUserSuccess } from "../../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../../firebase';

type formDataType = {
  profilePic: any;
  userName: string;
  userEmail: string;
  newPassword: string;
  confirmPassword: string;
};
type imgType = File | undefined;

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { currentUser } = useSelector((state: any) => state.user);
  const [image, setImage] = useState<imgType>(undefined);
  const [imagePercentage, setImagePercentage] = useState<number>(0);
  const [imgError, setImageError] = useState<Boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    profilePic: currentUser.profilePic,
    userName: currentUser.userName,
    userEmail: currentUser.userEmail,
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (image) handleImageUpload(image);
  }, [image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
        console.error("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          setFormData({
            ...formData,
            profilePic: downloadURL,
          });
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch("http://localhost:8000/api/user/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailed("Something went wrong. Try Again"));
      } else {
        dispatch(updateUserSuccess(data));
      }
    } catch (err) {
      dispatch(updateUserFailed(err));
    }
  };

  return (
    <div className="profile-div w-[100%] flex m-12">
      <Link to="/">
        <i className="fa-solid fa-circle-arrow-left back-icon"></i>
      </Link>

      <form
        className="profile-form mx-auto border w-[50%] p-10 bg-[#eee3e0f1]"
        onSubmit={handleSubmit}
      >
        <img
          src={formData.profilePic}
          alt="Profile"
          className="w-36 self-center profile-icon mx-auto rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current?.click()}
        />
       <p>
       <div className="text-center">
  {imgError && (
    <span className="text-red-700 text-center">Error Uploading Image</span>
  )}
  {imagePercentage > 0 && imagePercentage < 100 && (
    <span className="text-slate-700 text-center">{`Uploading Image ${imagePercentage} %`}</span>
  )}
  {imagePercentage === 100 && (
    <span className="text-green-700 item-center">Image Uploaded Successfully</span>
  )}
</div>

       </p>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />

        <p>Display Name</p>
        <input
          type="text"
          name="userName"
          required
          value={formData.userName}
          onChange={handleChange}
        />
        <p>Email Id</p>
        <input
          type="email"
          name="userEmail"
          disabled
          required
          value={formData.userEmail}
          onChange={handleChange}
        />
        <p>New Password</p>
        <input
          type="password"
          name="newPassword"
          required
          value={formData.newPassword}
          onChange={handleChange}
        />
        <p>Confirm Password</p>
        <input
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="btn-section flex items-center justify-between">
          <button className="bg-red-700 p-2 text-white">Delete account</button>
          <button className="bg-yellow-400 p-2" type="submit">
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
