import { userCollection } from '../../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateor from 'generate-password';
dotenv.config();

export const userSignup = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await userCollection.insertMany({ userName, userEmail, password: hashedPassword });

    // Exclude password before sending user data
    const token = jwt.sign({ id: newUser[0]._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
    });

    const { password: _, ...userWithoutPassword } = newUser[0]._doc; // insertMany returns an array

    res.status(200).json({
      message: "User signed up successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    const validUser = await userCollection.findOne({ userEmail });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Exclude password before sending user data
    const { password: _, ...userWithoutPassword } = validUser._doc;

    res.cookie('token', token, {
      httpOnly: true,
    })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: userWithoutPassword,
      });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const googleSignUp = async (req, res) => {
  const { userName, userEmail, profilePic } = req.body;
  try {
    const existingUser = await userCollection.findOne({ userEmail });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Exclude password before sending user data
      const { password: _, ...userWithoutPassword } = existingUser._doc;

      res.cookie('token', token, {
        httpOnly: true,
      })
        .status(200)
        .json({
          message: "User logged in via Google",
          user: userWithoutPassword,
        });
    } else {
      const generatedPassword = generateor.generate({
        length: 12,
        numbers: true,
        symbols: true,
      });

      const salt = 10;
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);
      const displayName = userName.split(" ").join("") + Math.floor(Math.random() * 1000);

      const newUser = await userCollection.create({
        userName: displayName,
        password: hashedPassword,
        userEmail,
        profilePic,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Exclude password before sending user data
      const { password: _, ...userWithoutPassword } = newUser._doc;

      res.cookie('token', token, {
        httpOnly: true,
      })
        .status(200)
        .json({
          message: "User signed up via Google",
          user: userWithoutPassword,
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
