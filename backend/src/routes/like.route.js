import { Router } from "express";
import { getLikedVideos } from "../controllers/like.controller.js";

const router = Router();

router.get("likedVideos", getLikedVideos);

export default router;
