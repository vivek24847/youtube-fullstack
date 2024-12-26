import mongoose from "mongoose";
import {config} from "dotenv";
config();

const connectDb = async () => {
  console.log(process.env.MONGODB_URL,"mongo")
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log("db connected successfully")
  } catch (error) {
    console.log(error, "MongoDB connection error");
  }
};

export default connectDb;
