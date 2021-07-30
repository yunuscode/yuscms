import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();

export default {
	path: "/",
	router: UserRouter,
};
