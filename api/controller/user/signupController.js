
import {  userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs'

export const userSignup = async (req,res)=>{
    const { userName, userEmail, password} = req.body;
    const salt =10;
    const hashedPassword =await bcrypt.hash(password, salt)
    try{
        const newUser  = await userCollection.insertMany({userName, userEmail, password: hashedPassword})
    console.log("data recived =========== > ",newUser)
    res.status(200).json({message:"successfully user added"});

    }
    catch(err)
    {
        console.log("error occured while adding data",err)
        res.status(500).json({error : err})
    }
}
