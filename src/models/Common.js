import { verifyPassword } from "../middleware/Bcrypt.js";
import { createJWT } from "../middleware/JWT.js";

const userJwtToken = async (data) => {
  return await createJWT(data);
};

const checkIfPasswordMatched = async (enteredPassword, dbPassword) => {
  return await verifyPassword (enteredPassword, dbPassword)
};

export { userJwtToken, checkIfPasswordMatched };
