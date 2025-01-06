import { Model } from "mongoose";
import * as Models from "../models/index.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllVideos = async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //get All videos based on query , sort , pagination
  try {
    const videos = await Models.Video.find().populate(
      "owner",
      "fullName email"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "All videos fetched succesfully"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const publishVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new ApiError(400, "Title and description are required");
    }

    const video = await Models.Video.create({
      videoFile: "",
      thumbnail: "",
      title: title,
      description: description,
      owner: req.user,
      isPublished: false,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video published successfuly"));
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const videos = await Models.Video.find({ owner: id });
    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Fetched user videos"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("paramss", req.body);
    if (!req.body.length === 0) {
      throw new ApiError(400, "Nothing to update");
    }
    await Models.Video.updateOne({ _id: id }, { $set: req.body });

    return res.status(200).json(new ApiResponse(200, "Video details updated"));
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.query;
    await Models.Video.deleteOne({ _id: id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Video deleted successfully"));
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.query;

    await Models.Video.updateOne({ _id: id }, [
      { $set: { isPublished: { $not: "$isPublished" } } },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, "Video status updated successfully"));
  } catch (err) {
    console.log("err", err);
    return res.status(400).send({ message: err });
  }
};

export {
  togglePublishStatus,
  deleteVideo,
  updateVideo,
  getVideoById,
  publishVideo,
  getAllVideos,
};
