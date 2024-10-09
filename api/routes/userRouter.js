import express from "express";
import { userLogin, userSignup ,googleSignUp} from '../controller/user/signupController.js'
import { updateUserData } from "../controller/user/userController.js";
const router = express.Router();

// user login and signup 
router.post('/signup',userSignup)
router.post('/login', userLogin)
router.post('/google/auth', googleSignUp)

// User details update and delete
router.post('/updateUser',updateUserData)

export default router;