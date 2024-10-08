import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginStart, loginFailed, loginSucess } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type formDataType = {
    userEmail: string;
    password: string;
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataType>({
        userEmail: '',
        password: ''
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error("Login Failed: " + data.message);
            }
            toast.success("Successfully logedIn")
            dispatch(loginSucess(data));
            navigate('/');
        } catch (err: any) {
            toast.error(err.message)
            dispatch(loginFailed(err.message));
        }
    };

    return (
        <div className="body-div">
            <div className="formDiv max-w-[40%] mx-auto my-auto mt-10 p-12 rounded-xl">
                <h1 className="text-center m-4 signin-heading">Log In</h1>
                <form className="signIn-form" autoComplete="off" onSubmit={handleFormSubmit}>
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
                    <button className="signin-btn bg-red-800 text-white">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
