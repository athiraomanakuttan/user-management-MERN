import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Error in connecting to database:", err));
