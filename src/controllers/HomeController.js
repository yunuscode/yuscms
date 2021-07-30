import { ErrorHandler } from "../helpers/handleError.js";

export default class HomeController {
	static async HomeGetController(request, response, next) {
		try {
			response.status(200).json({
				ok: true,
				appName: "YUSCMS",
				version: "0.0.2",
				documentation: "/",
			});
		} catch (error) {
			next(error);
		}
	}
}
