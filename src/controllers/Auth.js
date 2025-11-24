import { storeUser, login, resetUserPassword } from "../models/AuthModel.js";

const registerUser = async (req, res, next) => {
  const { body } = req;

  const result = await storeUser(body);
  const JSON = result.status
    ? { message: result?.message, jwtToken: result?.jwtToken }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

const loginUser = async (req, res, next) => {
  const { body } = req;

  const result = await login(body);
  const JSON = result.status
    ? { message: result?.message, jwtToken: result?.jwtToken }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

const logoutUser = async (req, res, next) => {
  res.status(200).json({ message: "user successfully logout." });
};

const resetPassword = async (req, res, next) => {
  const { body } = req;

  const result = await resetUserPassword(body);
  const JSON = result.status
    ? { message: result?.message, jwtToken: result?.jwtToken }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

export { registerUser, loginUser, logoutUser, resetPassword };
