import { hashPassword } from "../middleware/Bcrypt.js";
import { pool } from "../config/Db.js";
import { checkIfPasswordMatched, userJwtToken } from "./Common.js";

const storeUser = async (data) => {
  const { password } = data;
  const getHashedPassword = await hashPassword(password);
  data.password = getHashedPassword;
  try {
    const increaseCounter = await pool.query(
      `UPDATE counters SET value = value + 1 WHERE name = 'userCounters' RETURNING value`
    );
    data.id = increaseCounter?.rows[0]?.value;

    const query = `INSERT INTO users(firstName, lastName, email, password, role, id)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;`;

    const values = [...Object.values(data)];
    const result = await pool.query(query, values);

    delete data?.password;
    const jwtData = data;
    const getToken = await userJwtToken(jwtData);

    if (result && result?.rowCount && getToken)
      return {
        status: true,
        message: "User successfully created :)",
        jwtToken: getToken,
      };
    return {
      status: true,
      message: "User successfully created :)",
      jwtToken: getToken,
    };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

const login = async (body) => {
  const { email, password } = body;
  try {
    const query = `SELECT email, password, firstname, lastname, id, role FROM users WHERE email = '${email}' AND status = true;`;
    const result = await pool.query(query);
    if (!result.rows.length)
      return {
        status: false,
        message: "No user found. Please login with register email.",
      };

    const passwordMatched = await checkIfPasswordMatched(
      password,
      result?.rows?.[0]?.password
    );
    if (!passwordMatched)
      return {
        status: false,
        message: "Please check the password you have entered.",
      };

    const jwtData = result.rows[0];

    delete jwtData?.password;
    const getToken = await userJwtToken(jwtData);
    return {
      status: true,
      message: "Login successfull :)",
      jwtToken: getToken,
    };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

const resetUserPassword = async (body) => {
  const { email, newPassword } = body;
  try {
    const query = `SELECT email role FROM users WHERE email = '${email}' AND status = true;`;
    const result = await pool.query(query);
    if (!result.rows.length)
      return {
        status: false,
        message: "No user found. Please login with register email.",
      };

    const getHashedPassword = await hashPassword(newPassword);
    const updateQuery = `UPDATE users SET password = '${getHashedPassword}' WHERE email = '${email}' AND status = true;`;
    const updateResult = await pool.query(updateQuery);
    if (!updateResult.rowCount)
      return { status: false, message: "Something went wrong :(" };
    return { status: true, message: "Password successfully updated" };
  } catch (err) {
    return { status: false, message: err.message || "Server error" };
  }
};

export { storeUser, login, resetUserPassword };
