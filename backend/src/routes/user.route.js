import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authenticatedUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", authenticatedUser, logoutUser);
router.post("/changePassword", authenticatedUser, changePassword);
router.get("/viewChannel", authenticatedUser, getUserChannelProfile);
router.get("/watchHistory", authenticatedUser, getWatchHistory);

export default router;
