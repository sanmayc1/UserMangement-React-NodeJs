import User from "../model/user.js";
import { compare } from "bcrypt";
import tokenGenerate from "../utils/tokenGenerate.js";
import fs from "fs";

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



export { login, dataFetch, deleteUser };
