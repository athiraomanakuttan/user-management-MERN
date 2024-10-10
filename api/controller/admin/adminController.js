import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { userCollection } from '../../models/userSchema.js';
import { ObjectId } from 'mongodb'
import bcrypt  from 'bcryptjs';
dotenv.config()

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email.trim() === process.env.ADMIN_EMAIL && 
    password.trim() === process.env.ADMIN_PASSWORD
  ) {
    const payload = { email }; 

    const token = jwt.sign({ id: email }, process.env.ADIMI_JWT_SECRET, { expiresIn: '1h' });
  
        res.cookie('token', token, {
            httpOnly: true,
           
        })
    res.status(200).json({ message: "Login Successful",
     });
  } else {
    res.status(401).json("Invalid credentials");
  }
};

export const getUserList = async (req, res) => {
    try {
      // Fetch the user list from the database
      const userList = await userCollection.find({},{password:0});
  
      // Respond with the user list
      res.status(200).json({
        success: true,
        data: userList,
      });
    } catch (err) {
      console.error("Error fetching user list:", err); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the user list.",
        error: err.message || "Internal Server Error", // Provide a more user-friendly message
      });
    }
  };


  export const updateUser = async(req,res)=>{
    const id=  req.params.id;
    const { userName } = req.body;
    try{
        const updateUser = await userCollection.findOneAndUpdate({_id : new ObjectId(id)},{$set : {userName}},{ new: true})
        if(updateUser)
            res.status(200).json({
        success: true,
        message:"Successfully updated the user",
        data:updateUser
    })
    else
    res.status(500).json({
        success:false,
        message:"some error occured",
        error: "Internal server error"
    })
    } catch(err)
    {
        res.status(500).json({
            success:false,
            message:"some error occured",
            error: err.message || "Internal server error"
        })
    }
  }

  export const deleteUser = async (req,res)=>{
    const id = req.params.id
    try{
        const deleteUser = await userCollection.findOneAndDelete({_id : new ObjectId(id)})
        console.log(deleteUser)
        if(deleteUser)
        {
            const { password , ...rest} = deleteUser
            res.status(200).json({
                success: true,
                message:"user deleted suceessfully",
                data: rest
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            error:err.message || "Internal server error"
        })
    }
  }

  export const addNewUser = async (req, res) => {
    const { userName, userEmail, password } = req.body;
    try {
      const existingUser = await userCollection.findOne({ userEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        userName,
        userEmail,
        password: hashedPassword, 
      };
  
      const savedUser = await userCollection.insertMany(newUser)
      const userId = savedUser._id; 
      const token = jwt.sign(
        { id: userId, userEmail: newUser.userEmail }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
      );
  
      res.status(201).json({
        message: 'User added successfully',
        user: { id: userId, userName: newUser.userName, userEmail: newUser.userEmail }, 
        token, 
      });
    } catch (error) {
      console.error('Error adding new user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };