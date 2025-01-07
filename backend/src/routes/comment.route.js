import { Router } from "express";
import {
  addComments,
  deleteComments,
  getAllCommentsByVideoId,
  updateComments,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/add", addComments);
router.get("/:id", getAllCommentsByVideoId);
router.put("/edit", updateComments);
router.delete("/delete", deleteComments);

export default router;
