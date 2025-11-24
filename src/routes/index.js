import { AuthRouter } from "./Auth.js";
import { UserRouter } from "./User.js";
import { PostRouter } from "./Posts.js";
import { CommentRouter } from "./Comments.js";
import errorHandler from "../middleware/Error.js";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "../config/Swagger.js";

const Routes = [
  { path: "/auth", router: AuthRouter },
  { path: "/user", router: UserRouter },
  { path: "/posts", router: PostRouter },
  { path: "/comments", router: CommentRouter },
];

Routes.runApp = (App) => {
  // Register all defined routes
  Routes.forEach((route) => App.use(route.path, route.router));
  App.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Health check endpoint
  App.get("/health-check", (request, response, next) => {
    response.status(200).json({ message: " dockNode is up and running :) " });
  });

  // Global error handler
  App.use(errorHandler);
};

export default Routes;
