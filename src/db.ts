import mongoose from "mongoose";
import {DATABASE_URL} from "./index"

require ('dotenv'). config ();

export const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL,)
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
}