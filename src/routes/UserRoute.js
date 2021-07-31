import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.post("/account", UserController.UserCreateAccount);

export default {
	path: "/users",
	router: UserRouter,
};
