import express from 'express';
import { adminLogin , getUserList, updateUser, deleteUser,addNewUser} from '../controller/admin/adminController.js'
import { adminVerification } from '../middleware/adminVerification.js';

const router = express.Router()


router.post('/login',adminLogin)
router.get('/get-user-list',adminVerification ,getUserList)
router.post('/update-user/:id',adminVerification,updateUser)
router.post('/delete-user/:id',adminVerification,deleteUser)
router.post('/users',addNewUser)


export default router;