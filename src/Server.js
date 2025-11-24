import dotenv from "dotenv";
import { connectToDb } from "./config/Db.js";
dotenv.config();
const port = process.env.PORT;

const Server = async (APP) => {
  connectToDb();
  APP.listen(port, () => {
    console.log(`App is running on PORT: ${port}`);
  });
};

export default Server;
