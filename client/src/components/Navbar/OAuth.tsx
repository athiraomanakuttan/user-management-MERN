import React from 'react'
// import googleIcon from '../../assets/google-icon.webp';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from '../../firebase'
import { loginSucess } from '../../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const dispach = useDispatch()
    const navigate = useNavigate()
    const handleAuth = async()=>{
        try{
            const provider =  new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            if(result)
            {
                const res = await fetch('http://localhost:8000/api/user/google/auth',{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        userName : result.user.displayName ,
                        userEmail : result.user.email,
                        profilePic : result.user.photoURL
                    }) 
                })
                const data = await res.json()
                dispach(loginSucess(data))
                navigate('/')

            }
        }
        catch(err)
        {
            console.log("couldnot login with the google", err)
        }
    }
  return (
    <div>
      <button className="signup-google-btn bg-white w-[100%]" type="button" onClick={handleAuth}>
            {/* <img src={googleIcon} alt="Google Icon" className="w-10 inline" /> */}
            Continue with Google
          </button>
    </div>
  )
}

export default OAuth
