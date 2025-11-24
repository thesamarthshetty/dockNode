import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.JWT_KEY;
const exp = process.env.JWT_EXP;

const createJWT = async (data) => {
  return jwt.sign(data, secretKey, { expiresIn: exp });
};

const verifyJWT = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) return decoded;
    else return null;
  } catch (err) {
    //console.log(err.message);
  }
};

export { createJWT, verifyJWT };
