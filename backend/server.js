
import connectDb from "./src/db/index.js";
import express from "express";
import cors from "cors"
import  dotenv  from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

connectDb()
  .then(() => {
    const app = express();
    app.listen(process.env.PORT, () => {
    	console.log("server is running");
    });
    app.use(cors("*"))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static("public"))
    app.use(cookieParser())
  })
  .catch((error) => console.log(error));
