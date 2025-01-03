
import connectDb from "./src/db/index.js";
import express from "express";
import cors from "cors"
import  dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js"
import videoRouter from "./src/routes/video.route.js"
import playlistRouter from "./src/routes/playlist.route.js"
import likeRouter from "./src/routes/like.route.js"
import commentRouter from "./src/routes/comment.route.js"



dotenv.config();

connectDb()
  .then(() => {
    const app = express();
    app.use(cors("*"))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static("public"))

    app.use(cookieParser())
    //routes
    app.use("/api/v1/users" , userRouter)
    app.use("/api/v1/like" , likeRouter)
    app.use("/api/v1/playlist" , playlistRouter)
    app.use("/api/v1/video" , videoRouter)
    app.use("/api/v1/comment" , commentRouter)
    app.listen(process.env.PORT, () => {
    	console.log("server is running");
    });
    
  })
  .catch((error) => console.log(error));
