import { configDotenv } from "dotenv";
configDotenv()

export const mogoUrl = process.env.MongoURl;
export const PORT = process.env.PORT;