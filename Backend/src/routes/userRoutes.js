import express from "express";
import { signup ,login} from "../controller/userController.js";
import validtion from "../middleware/validation.js";
const userRouter = express.Router();

userRouter.post("/signup", validtion, signup);
userRouter.post('/login',login)

export default userRouter;
