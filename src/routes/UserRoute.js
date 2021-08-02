import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const UserRouter = Router();

UserRouter.post("/account", UserController.UserCreateAccount);
UserRouter.post("/login", UserController.UserLoginAccount);

UserRouter.get("/me", AuthMiddleware, UserController.UserGetMeAccount);

export default {
	path: "/users",
	router: UserRouter,
};
