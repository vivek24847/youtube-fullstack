import * as Models from "../models/index.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPlayist = async (req, res) => {
  try {
    const { name, description, videos } = req.body;
    if (!name || !description) {
      throw new ApiError(
        400,
        "Both name and description of playlist are required"
      );
    }

    const existingPlaylist = await Models.Playlist.findOne({ name: name });
    if (existingPlaylist) {
      throw new ApiError(400, "Playlist with same name already exists");
    }

    const playlist = await Models.Playlist.create({
      name: name,
      description: description,
      videos: videos || [],
      owner: req.user,
    });
    delete playlist.owner;

    return res
      .status(200)
      .json(new ApiResponse(200, playlist, "Playlist created successfully"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const getUserPlaylist = async (req, res) => {
  try {
    const playlist = await await Models.Playlist.find({
      owner: req.user,
    })
      .populate("videos", "title description")
      .populate("owner", "fullName");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          playlist,
          "User playlist data fetched successfully"
        )
      );
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    const playLists = await Models.Playlist.find({ owner: id }).populate(
      "videos",
      "title description"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, playLists, "Fetched playlist successfully"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    const { videos } = req.body;
    const { id } = req.query;

    await Models.Playlist.updateOne(
      { _id: id },
      { $push: { videos: { $each: videos } } }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Videos added to the playlist"));
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const { videos } = req.body;
    const { id } = req.query;

    await Models.Playlist.updateOne(
      { _id: id },
      { $pull: { videos: { $in: videos } } }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Video removed from the playlist successfully")
      );
  } catch (err) {
    console.log("23476", err);
    return res.status(400).send({ message: err });
  }
};

const deletPlaylist = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("arguments", id);
    await Models.Playlist.deleteOne({ _id: id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Playlist deleted successfully"));
  } catch (err) {
    console.log("234324", err);
    return res.status(400).send({ message: err });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("paramsds", { id, body: req.body });
    if (!req.body.length === 0) {
      throw new ApiError(400, "Nothing to update");
    }
    await Models.Playlist.updateOne({ _id: id }, { $set: req.body });

    return res
      .status(200)
      .json(new ApiResponse(200, "Playlist updated successfully"));
  } catch (err) {
    console.log("123", err);
    return res.status(400).send({ message: err });
  }
};

export {
  createPlayist,
  getUserPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletPlaylist,
  updatePlaylist,
};
