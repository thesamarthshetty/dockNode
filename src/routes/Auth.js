import Express from "express";
import {
  registerUserValidation,
  registerLoginValidation,
  passResetValidation,
} from "../validators/Auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} from "../controllers/Auth.js";
import { Validation } from "../middleware/Validation.js";

const AuthRouter = new Express.Router();

AuthRouter.post("/register", Validation(registerUserValidation), registerUser);
AuthRouter.post("/login", Validation(registerLoginValidation), loginUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: logout user
 *     tags: [Users]
 *     parameters:
 *       - `in`: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: user successfully logout.
 */

AuthRouter.get("/logout", logoutUser);
AuthRouter.post("/reset-password", Validation(passResetValidation), resetPassword);

export { AuthRouter };
