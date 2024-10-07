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
    }
});

export const userCollection = mongoose.model('Users',userSchema)