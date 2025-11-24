import { storeUserPost, getUserPost, getPost } from "../models/Post.js";

const getAllPost = async (req, res, next) => {
  const { user } = req;
  const result = await getUserPost(user);
  const JSON = result.status
    ? { message: result?.message, data: result?.data || [] }
    : { message: result?.message, data: [] };

  res.status(200).json(JSON);
  next();

  res.status(200).json({ message: " dockNode is up and running :) " });
};

const createPost = async (req, res, next) => {
  const { body, user } = req;
  const result = await storeUserPost(body, user);
  const JSON = result.status
    ? { message: result?.message, jwtToken: result?.jwtToken }
    : { message: result?.message, jwtToken: null };

  res.status(200).json(JSON);
  next();
};

const getSinglePost = async (req, res, next) => {
  const result = await getPost(req);
  const JSON = result.status
    ? { message: result?.message, data: result?.data || [] }
    : { message: result?.message, data: [] };

  res.status(200).json(JSON);
  next();
};

export { getAllPost, createPost, getSinglePost };
