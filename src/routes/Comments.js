import Express from "express";
import { getSingleComments } from "../controllers/Comments.js";

const CommentRouter = new Express.Router();

CommentRouter.get("/:id", getSingleComments);

export { CommentRouter };
