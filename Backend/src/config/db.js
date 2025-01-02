import mongoose from "mongoose";
import { mogoUrl } from "./env.js";

export default function mongoConnect(){
    mongoose
  .connect(mogoUrl)
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));
}
