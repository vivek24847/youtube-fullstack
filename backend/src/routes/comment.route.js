import { Router } from "express";
import {
  addComments,
  deleteComments,
  getAllComments,
  updateComments,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/add", addComments);
router.get("/comments", getAllComments);
router.patch("/edit", updateComments);
router.delete("/delete", deleteComments);

export default router;
