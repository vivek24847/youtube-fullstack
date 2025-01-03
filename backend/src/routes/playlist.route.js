import { Router } from "express";
import {
  createPlayist,
  addVideoToPlaylist,
  getUserPlaylist,
  updatePlaylist,
  getPlaylistById,
  deletPlaylist,
  removeVideoFromPlaylist,
} from "../controllers/playlist.controller";

const router = Router();

router.post("/create", createPlayist);
router.post("/add", addVideoToPlaylist);
router.get("/playlist", getUserPlaylist);
router.get("/playlistById", getPlaylistById);
router.delete("/delete", deletPlaylist);
router.delete("/remove", removeVideoFromPlaylist);
router.patch("/update", updatePlaylist);

export default router;
