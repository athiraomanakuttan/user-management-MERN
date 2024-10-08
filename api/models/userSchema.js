import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName :{
        required : true,
        type:String,
    },
    userEmail :{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profilePic : {
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/147/147144.png"
    }
},{timestamps : true});

export const userCollection = mongoose.model('Users',userSchema);