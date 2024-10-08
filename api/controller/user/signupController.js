
import { userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const userSignup = async (req, res, next) => {
    const { userName, userEmail, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const newUser = await userCollection.insertMany({ userName, userEmail, password: hashedPassword })
        res.status(200).json({ message: "User added successfully" });
    }
    catch (err) {
        next(err)
    }
}
export const userLogin = async (req,res,next)=>{
    const { userEmail,password}= req.body;
    
    try{
        const validUser = await userCollection.findOne({ userEmail});
        if(!validUser)
            next({message : "User Not Found"});
        else
        {
            const validPassword = await bcrypt.compare(password, validUser.password);

            if(!validPassword)
                next({message: "Incorrect Password"}) 
            else
            {
                const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)
                res.cookie('token',token, {httpOnly: true}).status(200).json(validUser)
            }
        }
    }
    catch(err)
    {
        console.log(err)
        next(err)
    }
}