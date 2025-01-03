import express from "express";
import { signup ,login,profile,profileUpdate} from "../controller/userController.js";
import validtion from "../middleware/validation.js";
import verifyToken from "../middleware/jwtVerify.js";
import upload from "../utils/multer.js";
const userRouter = express.Router();

userRouter.post("/signup", validtion, signup);
userRouter.post('/login',login);
userRouter.get('/profile',verifyToken,profile)
userRouter.post('/profileupdate',upload.single('profile'),verifyToken,profileUpdate)

export default userRouter;
