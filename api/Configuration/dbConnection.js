import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const url = process.env.DB_URL; 

const connectDB = async () => {
    try {
        await mongoose.connect(url); // Removed deprecated options
        console.log("Database connected");
    } catch (err) {
        console.error("Error in connecting to database:", err);
        process.exit(1); 
    }
};

export default connectDB;
