import { Router } from "express";
import { getLikedVideos } from "../controllers/like.controller.js";

const router = Router();

router.get("videos", getLikedVideos);

export default router;
