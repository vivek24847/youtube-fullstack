import { Router } from "express";
import {
  getAllVideos,
  deleteVideo,
  getVideoById,
  updateVideo,
  publishVideo,
} from "../controllers/video.controler";

const router = Router();

router.get("/videos", getAllVideos);
router.delete("/delete", deleteVideo);
router.patch("/update", updateVideo);
router.get("/videoByID", getVideoById);
router.post("/add", publishVideo);

export default router;
