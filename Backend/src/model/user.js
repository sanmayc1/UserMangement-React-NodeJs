import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
      type:String,
      default:null
    },
    role:{
        type:String,
        default:'user'
    },
    lastlogin:{
        type:String
    }
});

const User = mongoose.model('User',userSchema);

export default User;