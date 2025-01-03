import express from "express";
import userRouter from "./routes/userRoutes.js";
import mongoConnect from "./config/db.js";
import cors from 'cors'
import { PORT } from "./config/env.js";

const app = express();

app.use(express.json())
app.use('/uploads',express.static('uploads'))
//Cross-origin 
app.use(cors());

//mongoDb connected 
mongoConnect()

// user Router
app.use('/user',userRouter)

//server running 
app.listen(PORT, () => console.log(`server is running on Localhost:${PORT}`));
