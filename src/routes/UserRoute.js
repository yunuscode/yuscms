import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.post("/account", UserController.UserCreateAccount);
UserRouter.post("/login", UserController.UserLoginAccount);

export default {
	path: "/users",
	router: UserRouter,
};
