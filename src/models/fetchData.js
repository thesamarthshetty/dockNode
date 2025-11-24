// fetchData.js
import { pool } from "../config/Db.js";

const fetchDataFromUser = async () => {
  try {
    const users = await pool.query("SELECT * FROM users");
    return users.rows;
  } catch (err) {
    console.error("Database error:", err);
  }
};

const fetchDataFromPosts = async () => {
  try {
    const posts = await pool.query("SELECT * FROM posts");
    return posts.rows;
  } catch (err) {
    console.error("Database error:", err);
  }
};


export { fetchDataFromUser, fetchDataFromPosts }