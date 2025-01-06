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
    }).populate("videos", "title description") 
    .populate("owner", "fullName")

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

const getPlaylistById = async (req , res) => {
 try {
    const {id} = req.params

    const playLists = await Models.Playlist.find({owner :id }).populate("videos" , "title description")

    return res.status(200).json( new ApiResponse(200 ,playLists, "Fetched playlist successfully"))

 } catch (err) {
    return res.status(400).send({message:err})
 }
};

const addVideoToPlaylist = async (req , res) => {
  //create playlist
};

const removeVideoFromPlaylist = async () => {
  //remove video from playlist
};

const deletPlaylist = async () => {
  //delete playlist
};

const updatePlaylist = async () => {
  //update playlist
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
