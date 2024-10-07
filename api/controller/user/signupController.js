
import { userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs'

export const userSignup = async (req, res, next) => {
    const { userName, userEmail, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const newUser = await userCollection.insertMany({ userName, userEmail, password: hashedPassword })
        res.status(200).json({ message: "User added successfully" });
    }
    catch (err) {
        console.log("error occured while adding data", err)
        next(err)
    }
}
