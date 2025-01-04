import User from "../model/user.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import tokenGenerate from "../utils/tokenGenerate.js";

const saltRound = 12;

//Sign up logic
const signup = async (req, res) => {
  try {
    //Checking the the user is already exist
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ email: "User alerady existing" });
    }
    // Save user data in database
    const hashPassword = await hash(req.body.password, saltRound);
    const NewUser = new User({ ...req.body, password: hashPassword });
    await NewUser.save();
    return res.status(201).json({ status: "sucess" });
  } catch (error) {
    res.status(500).json({ status: "internal servver failed" });
    console.log(error.message);
  }
};

//Login Logic
const login = async (req, res) => {
  try {
    //check user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ loginErr: "User not found please sign up" });
    }
    //matching user password
    const match = await compare(req.body.password, user.password);
    if (!match) {
      
      return res.status(401).json({ loginErr: "Invalid Credentials" });
    }

    const date = new Date().toLocaleString().split(',')[0]
    await User.findByIdAndUpdate(user.id,{lastlogin:date})
    const userDetails = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    // const secretKey = process.env.SECRET_KEY;
    // const token = jwt.sign(userDetails, secretKey, { expiresIn: "1h" });
    const token = tokenGenerate(userDetails)
    res.status(200).json({ token, userDetails });
  } catch (error) {
    console.log(error);
  }
};

//Profile data fetching

const profile = async (req, res) => {
  try {
    const userDeatils = await User.findById(req.user.id);
    const { username, email, phone, profilePic } = userDeatils;
    res.status(200).json({ username, email, phone, profilePic });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const profileUpdate = async (req, res) => {
  try {
    const file = req.file;
    /// if user aleready have a profile delete the old one
    if (file) {
      const user = await User.findById(req.user.id);
      if (user.profilePic) {
        //delete old file
        fs.unlink(user.profilePic, (err) => {
          if (err) console.log(err);
          else console.log("old image deleted");
        });
      }
      await User.findByIdAndUpdate(req.user.id, { profilePic: file.path });
    }
    // updating other user details
    const { username, phone } = req.body;
    const save = await User.findByIdAndUpdate(req.user.id, { username, phone });
    res.status(200).json({ image: save });
  } catch (error) {}
};

export { signup, login, profile, profileUpdate };
