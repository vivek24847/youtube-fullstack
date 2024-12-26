import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowerCase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowerCase: true,
      index: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      lowerCase: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Videos" }],
    passWord: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
