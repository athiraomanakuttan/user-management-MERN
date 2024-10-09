import express from "express";
import { userLogin, userSignup ,googleSignUp} from '../controller/user/signupController.js'
import { updateUserData  , logoutUser} from "../controller/user/userController.js";
import { userVerification } from "../middleware/userVerification.js";
const router = express.Router();

// user login and signup 
router.post('/signup',userSignup)
router.post('/login', userLogin)
router.post('/google/auth', googleSignUp)

// User details update and delete
router.post('/updateUser/:id',userVerification,updateUserData)
router.post('/sign-out',logoutUser)

export default router;