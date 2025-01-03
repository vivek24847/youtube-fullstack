const getAllVideos = async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //get All videos based on query , sort , pagination
  try {
  } catch (err) {}
};

const publishVideo = async () => {
  //get a video and create a video by uplaoding it to cloudinary
};

const getVideoById = async () => {
  //get a video by id
};

const updateVideo = async () => {
  //update a video
};

const deleteVideo = async () => {
  //delete a video
};

const togglePublishStatus = async () => {
  //toggle publish status
};

export {
  togglePublishStatus,
  deleteVideo,
  updateVideo,
  getVideoById,
  publishVideo,
  getAllVideos,
};
