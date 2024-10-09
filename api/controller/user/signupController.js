
import { userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import generateor from 'generate-password'
dotenv.config()

export const userSignup = async (req, res, next) => {
    const { userName, userEmail, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const newUser = await userCollection.insertMany({ userName, userEmail, password: hashedPassword })
        res.status(200).json(newUser);
    }
    catch (err) {
        next(err)
    }
}
export const userLogin = async (req, res) => {
    const { userEmail, password } = req.body;

    try {
        const validUser = await userCollection.findOne({ userEmail });
        if (!validUser) {
            console.log("User Not found");
            return res.status(404).json({ message: "User not Found" });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
           .status(200).json(validUser);

    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


export const googleSignUp = async(req,res)=>{
    const { userName, userEmail, profilePic } = req.body
    try{
        const existingUser = await userCollection.findOne({userEmail})
        if(existingUser)
        {
            const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET,{expiresIn: '1h'})
            res.cookie('token',token , {httpOnly: true, secure: true, sameSite: 'strict'})
            res.status(200).json(existingUser)
        }
        else
        {
            const generatedPassword = generateor.generate({
                length:12,
                numbers:true,
                symbols:true
            })
            const salt =10;

            const hashedPassword = await bcrypt.hash(generatedPassword,salt)
            const displayName = userName.split(" ").join("") + Math.floor(Math.random() * 1000)
            const newUser = await userCollection.insertMany({userName: displayName, password:hashedPassword, userEmail, profilePic})
            res.status(200).json(newUser)
        }
    } catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
}