
import {  userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs'

export const userSignup = async (req,res)=>{
    const { userName, userEmail, password} = req.body;
    const salt =10;
    const hashedPassword =await bcrypt(password, salt)
    try{
        const newUser  = await userCollection.insertOne({userName, userEmail, password: hashedPassword})
    }
    catch(err)
    {
        res.status(500).json({error : err})
    }
}
