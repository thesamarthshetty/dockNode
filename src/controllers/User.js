import { getAllRegisteredUsers, getSpecificUser } from "../models/UserModel.js";

const getAllUsers = async (req, res, next) => {
  const result = await getAllRegisteredUsers(req);
  const JSON = result.status
    ? { message: result?.message, data: result?.data || [] }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

const getSingleUsers = async (req, res, next) => {
  const result = await getSpecificUser(req);
  const JSON = result.status
    ? { message: result?.message, data: result?.data || [] }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

// const getUsers = async (req, res, next) => {
//   res.status(200).json({ message: " dockNode is up and running :) " });
// };

export { getAllUsers, getSingleUsers };
