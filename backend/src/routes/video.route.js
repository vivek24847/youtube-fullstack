import { Router } from "express";
import {
  getAllVideos,
  deleteVideo,
  getVideoById,
  updateVideo,
  publishVideo,
  togglePublishStatus
} from "../controllers/video.controler.js";

const router = Router();

router.get("/videos", getAllVideos);
router.delete("/delete", deleteVideo);
router.put("/update", updateVideo);
router.get("/:id", getVideoById);
router.post("/add", publishVideo);
router.put("/publish", togglePublishStatus);

export default router;
