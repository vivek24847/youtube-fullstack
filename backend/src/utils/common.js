import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (id) => {
  const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  return token;
};

const generateRefreshToken = (id) => {
    const token = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return token;
  };

const checkPassword = async (pass, hashPass) => {
  const result = await bcrypt.compare(pass, hashPass);
  return result;
};

const hashPassword = async (password) => {
  const newPassword = await bcrypt.hash(password , 10)
  console.log("newPassword ==" , newPassword)
  return newPassword
}

export { generateAccessToken, checkPassword , generateRefreshToken , hashPassword};
