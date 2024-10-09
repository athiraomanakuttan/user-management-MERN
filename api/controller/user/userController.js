import bcrypt from 'bcryptjs';
import { userCollection } from '../../models/userSchema.js';

export const updateUserData = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("Unauthorized: User is not valid");
  }

  const { userEmail, userName, newPassword, profilePic } = req.body;

  try {
    // Create the data object with the fields to update
    const data = {
      userName: userName,
      userEmail: userEmail,
      profilePic: profilePic,
    };

    // If the user is updating their password, hash the new password
    if (newPassword) {
      const saltRounds = 10;  // You can adjust salt rounds if needed
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      data.password = hashedPassword;
    }

    // Update the user with the new data
    const updatedUser = await userCollection.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      { new: true }  // Returns the updated user
    );

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
