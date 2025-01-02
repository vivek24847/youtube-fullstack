
import connectDb from "./src/db/index.js";
import express from "express";
import cors from "cors"
import  dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js"



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
    app.listen(process.env.PORT, () => {
    	console.log("server is running");
    });
    
  })
  .catch((error) => console.log(error));
