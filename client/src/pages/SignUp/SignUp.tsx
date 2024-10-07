import { useEffect, useState } from "react";
import googleIcon from '../../assets/google-icon.webp';
import loadingIcon from '../../assets/loading.gif';
import './signup.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpStart, signUpSuccess, signUpFailed} from '../../../redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


type formData = {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<formData>({
    userName: "",
    userEmail: "",
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toast("Welcome to SignUp page!");
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispach(signUpStart())
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      dispach(signUpFailed("Passwords do not match"))
      return;
    }

    if (!validateEmail(formData.userEmail)) {
      toast.error("Invalid email format");
      dispach(signUpFailed("Invalid email format"))
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        dispach(signUpFailed("Sign up failed. Please try again."))
        throw new Error("Sign up failed. Please try again.");
      }

      const data = await res.json();
      toast.success("Sign up successful!");
      setLoading(false);
      setError("");
      dispach(signUpSuccess(data))
      navigate('/')
    } catch (error) {
      setLoading(false);
      const errorMessage = (error as Error).message || "Some error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      dispach(signUpFailed(errorMessage))
    }
  };


  return (
    <div>
      <div className="formDiv bg-slate-200 max-w-[40%] mx-auto mt-10 p-6 rounded-xl">
        <h1 className="text-center m-4 signup-heading">Sign Up</h1>
        <form className="signUp-form" autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            required
            onChange={handleInput}
            placeholder="Full Name"
            value={formData.userName}
          />
          <input
            type="email"
            name="userEmail"
            required
            onChange={handleInput}
            placeholder="Email ID"
            value={formData.userEmail}
          />
          <input
            type="password"
            name="password"
            required
            onChange={handleInput}
            placeholder="Password"
            value={formData.password}
          />
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={handleInput}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
          />
          <button
            className="signup-btn bg-red-800 text-white"
            disabled={loading}
          >
            {loading ? <img src={loadingIcon} className="inline w-6" /> : "Sign Up"}
            
          </button>
          <button className="signup-google-btn bg-white">
            <img src={googleIcon} alt="Google Icon" className="w-10 inline" />
            Signup with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
