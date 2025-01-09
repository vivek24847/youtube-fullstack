import * as Models from "../models/index.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleCommentLike = async () => {
    //toggle comment like
}


const getLikedVideos = async (req , res) => {
   try {

    const videos = await Models.Like.find({_id: req.user})

   }catch (err){
    return res.status(400).send({message:err})
   }
}


export {toggleCommentLike , getLikedVideos }