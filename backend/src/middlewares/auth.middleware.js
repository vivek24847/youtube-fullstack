import jwt from "jsonwebtoken"
import { ApiError } from "../utils/APIerror.js";

const authenticatedUser = async (req , res , next) => {
  try{
    let {authorization} = req.headers;

    if (!authorization) {
      throw new ApiError(401, "Authorization header is missing");
    }

    const token = authorization.replace("Bearer" , " ").trim()
    const user = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
     if(!user){
      throw new ApiError(400 , "No token provided")
     }
     req.user = user.id
     next()

   
  }catch (err) {
    res.status(err.status || 401).json({
      message: err.message || "Authentication failed"
    });
  }
}

export default authenticatedUser