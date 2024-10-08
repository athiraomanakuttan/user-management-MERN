import express from "express";
import { userLogin, userSignup ,googleSignUp} from '../controller/user/signupController.js'
const router = express.Router();

router.post('/signup',userSignup)
router.post('/login', userLogin)
router.post('/google/auth', googleSignUp)

export default router;