import { pool } from "../config/Db.js";

const getAllRegisteredUsers = async ({ query: { pageNumber } }) => {
  let offSet = parseInt(pageNumber) * 10;
  try {
    const query = `SELECT firstname, lastname, email FROM users ORDER BY id LIMIT 10 OFFSET ${offSet}`;
    const result = await pool.query(query);
    return { status: true, data: result.rows };
  } catch (err) {
    return { status: false, message: err.message || "Something went wrong" };
  }
};

const getSpecificUser = async ({ query: { email, pageNumber } }) => {
  let offSet = parseInt(pageNumber) * 10;
  try {
    const query = `SELECT firstname, lastname, email FROM users WHERE REGEXP_LIKE(email, '${email}') ORDER BY id LIMIT 10 OFFSET ${offSet}`;
    const result = await pool.query(query);
    return { status: true, data: result?.rows || [] };
  } catch (err) {
    return { status: false, message: err.message || "Something went wrong" };
  }
};

export { getAllRegisteredUsers, getSpecificUser };
