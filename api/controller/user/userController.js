import { userCollection } from '../../models/userSchema.js';



export const updateUserData = async(req,res)=>{
    const {userEmail , userName , newPassword , confirmPassword}  = req.body;
        
}

