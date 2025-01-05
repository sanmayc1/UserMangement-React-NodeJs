import User from "../model/user.js";
import { compare, hash } from "bcrypt";
import tokenGenerate from "../utils/tokenGenerate.js";
import fs from "fs";
const saltRound = 12;

// Login logic
const login = async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin?.role !== "admin") {
      return res.status(401).json({ message: "Access denied" });
    }

    const verify = await compare(req.body.password, admin.password);

    if (!verify) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { username, id, role } = admin;
    const details = { username, id, role };
    const token = tokenGenerate(details);
    // success response
    res.status(200).json({ token, details });
  } catch (error) {
    console.log(error);
  }
};

// fetch request for user data

const dataFetch = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

// delete user

const deleteUser = async (req, res) => {
  if (req.body.path) {
    fs.unlink(req.body.path, (err) => {
      if (err) console.log(err);
    });
  }
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (user) {
      return res.status(200).json({ message: "user deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

///add new user

const addNewUser = async (req, res) => {
  try {
    //Checking the the user is already exist
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: "User alerady existing" });
    }
    // Save user data in database
    const hashPassword = await hash(req.body.password, saltRound);
    const { confirmPassword, ...userData } = req.body;
    const NewUser = new User({ ...userData, password: hashPassword });
    await NewUser.save();
    return res.status(201).json({ status: "sucess" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

///edit user details

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, phone } = req.body;
    const user = await User.findById(id);

    //checking email is same or change
    if (email !== user.email) {
      //checking this email is exists
      const exist = await User.findOne({ email });
      if (!exist.$isEmpty()) {
        return res.status(409).json({message:"User already exist"})
      }
    }
    
    user.email =email
    user.phone =phone
    user.username= username

    const save = await user.save()
    if(!save.$isEmpty()){
      res.status(200).json({message:"User details Edited Successfully",user})
    }


  } catch (error) {}
};

export { login, dataFetch, deleteUser, addNewUser, editUser };
