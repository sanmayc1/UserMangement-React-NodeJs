import User from "../model/user.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";


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
      return res.status(401).json({ loginErr: "User not found please sign up" });
    }
      //matching user password
      const match = await compare(req.body.password, user.password);
      if (!match) {
       return res.status(401).json({ loginErr: "Invalid Credentials" });
      }
      
      const userDetails = {username:user.username,id:user.id,role:user.role}
      const secretKey = process.env.SECRET_KEY
      const token = jwt.sign(userDetails,secretKey,{expiresIn:'1h'})
        res.status(200).json({token,userDetails});
  } catch (error) {
    console.log(error)
  }
};

//Profile data fetching 

const profile = async(req,res)=>{
  try {
   console.log(req.user)
    const userDeatils = await User.findById(req.user.id)
    const {username,email,phone} = userDeatils
    res.status(200).json({username,email,phone})
    
  } catch (error) {
    
  }
}

export { signup, login ,profile};
