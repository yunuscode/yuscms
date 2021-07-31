import { ErrorHandler } from "../helpers/handleError.js";
import { createNewHash } from "../modules/bcrypt.js";
import { Validations } from "../modules/validations.js";

export default class UserController {
	static async UserCreateAccount(request, response, next) {
		try {
			const { name, username, password } = await (
				await Validations.UserCreateAccountValidation()
			).validateAsync(request.body);

			const user = await request.db.users.findOne({
				where: {
					user_username: username,
				},
			});

			if (user) throw new response.error(400, "Username already exists");

			await request.db.users.create({
				user_username: username,
				user_name: name,
				user_password: await createNewHash(password),
			});

			response.status(201).json({
				ok: true,
				message: "Successfully created",
			});
		} catch (error) {
			if (!error.statusCode)
				error = new response.error(400, "Invalid inputs");
			next(error);
		}
	}
}
