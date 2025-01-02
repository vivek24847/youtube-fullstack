// import { User } from "../models/user.model";
import * as Models from "../models/index.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils/common.js";

const projection = { __v: 0 };
const option = { lean: true };

const registerUser = async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;
    console.log("hehebod" , req)
    console.log("filesss" , req.files)

    if (
      [username, email, fullName, password].some((field) => field.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const query = {
      $or: [{ email: email.toLowerCase() }, { username: username }],
    };

    const existedUser = await Models.User.findOne(query, projection, option);

    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("picsss" ,{avatar , coverImage})
    

    if(!avatar){
        throw new ApiError(400 , "Avatar is required")
    }

    const updatedPassword = await hashPassword(password);
    console.log("updatedPassword232", updatedPassword);

    const user = await Models.User.create({
      fullName,
      avatar: avatar?.url,
      coverImage: coverImage?.url || " ",
      email: email.toLowerCase(),
      password: updatedPassword,
      username: username.toLowerCase(),
    });
    // const createdUser = { ...user };
    delete user._doc["password"];
    delete user.__v;

    res
      .status(200)
      .json(new ApiResponse(200, user, "User created successfully"));
  } catch (err) {
    console.log("err----", err);
    res.status(400).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "Both email and password are required");
    }

    const user = await Models.User.findOne(
      { email: email },
      projection,
      option
    );

    if (!user) {
      throw new ApiError(400, "User not found with this email");
    }

    const isPasswordValid = await checkPassword(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(400, "Wrong password");
    }
    delete user.password;

    const token = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    await Models.User.updateOne({ _id: user._id }, { $set: { refreshToken } });

    const result = { ...user, token };
    delete result.watchHistory;
    delete result.refreshToken;

    return res
      .status(200)
      .json(new ApiResponse(200, result, "User logged in succesfully"));
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await Models.User.findOne(
      { _id: req.user },
      projection,
      option
    );

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    await Models.User.updateOne(
      { _id: req.user },
      { $unset: { refreshToken: "" } }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new ApiError(
        400,
        "Both currentPassword and newPassword are required "
      );
    }

    const user = await Models.User.findById(req.user, projection, option);

    const isPasswordValid = await checkPassword(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new ApiError(400, "Entered current password is wrong");
    }

    const isSamePassword = await checkPassword(newPassword, user.password);

    if (isSamePassword) {
      throw new ApiError(
        400,
        "Current password and new passwords cannot be same"
      );
    }

    const updatedPassword = await hashPassword(newPassword);

    await Models.User.updateOne(
      { _id: req.user },
      { $set: { password: updatedPassword } }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Changed password successfully"));
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

export { registerUser, loginUser, logoutUser, changePassword };
