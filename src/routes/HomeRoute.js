import { Router } from "express";
import HomeController from "../controllers/HomeController.js";

const HomeRouter = Router();

HomeRouter.get("/", HomeController.HomeGetController);

export default {
	path: "/",
	router: HomeRouter,
};
