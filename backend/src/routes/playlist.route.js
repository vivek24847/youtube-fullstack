import { Router } from "express";
import {
  createPlayist,
  addVideoToPlaylist,
  getUserPlaylist,
  updatePlaylist,
  getPlaylistById,
  deletPlaylist,
  removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

router.post("/create", createPlayist);
router.post("/add", addVideoToPlaylist);
router.get("/userPlaylist", getUserPlaylist);
router.get("/:id", getPlaylistById);
router.delete("/delete", deletPlaylist);
router.delete("/remove", removeVideoFromPlaylist);
router.put("/update", updatePlaylist);

export default router;
