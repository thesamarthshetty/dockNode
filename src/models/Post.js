import { pool } from "../config/Db.js";

const storeUserPost = async (body, user) => {
  const { id: userId } = user;
  try {
    const counterQuery = `UPDATE counters SET value = value + 1 WHERE name = 'postCounters' RETURNING *`;
    const counter = await pool.query(counterQuery);

    body.id = counter?.rows[0]?.value;
    const query = `INSERT INTO posts(title, subTitle, postUrl, id, userId)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`;

    const values = [...Object.values({ ...body, userId })];
    const result = await pool.query(query, values);

    if (result)
      return {
        status: true,
        message: "post successfully created :)",
      };
    return { status: false, message: "something went wrong :(" };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

const getUserPost = async (user) => {
  const { id: userId } = user;
  try {
    const query = `SELECT * FROM posts WHERE userid = ${userId}`;
    const result = await pool.query(query);
    return { status: true, data: result?.rows || [] };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

const getPost = async ({ params: { id } }) => {
  try {
    const query = `SELECT * FROM posts WHERE id = ${id}`;
    const result = await pool.query(query);
    return { status: true, data: result?.rows || [] };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

export { storeUserPost, getUserPost, getPost };
