import express from 'express';
import { adminLogin , getUserList, updateUser, deleteUser} from '../controller/admin/adminController.js'
import { adminVerification } from '../middleware/adminVerification.js';

const router = express.Router()


router.post('/login',adminLogin)
router.get('/get-user-list' ,getUserList)
router.post('/update-user/:id',updateUser)
router.post('/delete-user/:id',deleteUser)


export default router;