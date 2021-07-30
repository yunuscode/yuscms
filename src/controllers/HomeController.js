import { ErrorHandler } from "../helpers/handleError.js";

export default class HomeController {
	static async HomeGetController(request, response, next) {
		try {
			throw new ErrorHandler(404, "Not found");
		} catch (error) {
			next(error);
		}
	}
}
