import mongoose from "mongoose";
import {config} from "dotenv";
config();

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log("db connected successfully")
  } catch (error) {
    console.log("MongoDB connection error",error);
  }
};

export default connectDb;
