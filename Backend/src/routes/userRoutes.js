import express from "express";
import { signup ,login,profile} from "../controller/userController.js";
import validtion from "../middleware/validation.js";
import verifyToken from "../middleware/jwtVerify.js";
const userRouter = express.Router();

userRouter.post("/signup", validtion, signup);
userRouter.post('/login',login);
userRouter.get('/profile',verifyToken,profile)

export default userRouter;
