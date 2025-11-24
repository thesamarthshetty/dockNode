import Express from "express";
import Server from "./Server.js";
import Routes from "./routes/index.js";

const app = new Express();

app.use(Express.json());
Routes.runApp(app);
Server(app);
