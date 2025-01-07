import * as Models from "../models/index.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllCommentsByVideoId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Models.Comment.find({ video: id });

    console.log("comments", comments);

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Fetched all comments"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const addComments = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.query;
    if (!content) {
      throw new ApiError(400, "Content is required");
    }

    const comment = await Models.Comment.create({
      content: content,
      video: id,
      owner: req.user,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Comment added successfully"));
  } catch (err) {
    console.log("23423", err);
    return res.status(200).send({ message: err });
  }
};

const updateComments = async (req, res) => {
  try {
    const { id } = req.query;
    await Models.Comment.updateOne({ _id: id }, { $set: req.body });
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment updated successfully"));
  } catch (err) {
    console.log("err", err);
    return res.status(400).send({ message: err });
  }
};

const deleteComments = async (req, res) => {
  try {
    const { id } = req.query;
    await Models.Comment.deleteOne({ _id: id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment deleted successfully"));
  } catch (err) {
    console.log("err", err);
    return res.status(400).send({ message: err });
  }
};

export { getAllCommentsByVideoId, addComments, updateComments, deleteComments };
