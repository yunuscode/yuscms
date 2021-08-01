import pkg from "sequelize";
const { Op } = pkg;
import { compareHash, createNewHash } from "../modules/bcrypt.js";
import { signJwtToken } from "../modules/jsonwebtoken.js";
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
	static async UserLoginAccount(request, response, next) {
		try {
			const { username, password } = await (
				await Validations.UserLoginAccountValidation()
			).validateAsync(request.body);

			const user = await request.db.users.findOne({
				where: {
					user_username: username,
				},
				raw: true,
			});

			if (!user) throw new response.error(400, "User Not found");

			const isTrust = await compareHash(password, user.user_password);

			if (!isTrust) {
				throw new response.error(400, "Password incorrect");
			}

			const user_ip =
				request.headers["x-forwarded-for"] ||
				request.socket.remoteAddress;
			const user_agent = request.headers["user-agent"];

			const session = await request.db.sessions.create({
				user_id: user.user_id,
				session_inet: user_ip,
				session_user_agent: user_agent,
			});

			await request.db.sessions.destroy({
				where: {
					[Op.and]: {
						user_id: user.user_id,
						session_inet: user_ip,
						session_user_agent: user_agent,
					},
				},
			});

			const access_token = await signJwtToken({
				session_id: session.dataValues.session_id,
			});

			response.status(201).json({
				ok: true,
				message: "Successfully logged in",
				data: {
					token: access_token,
				},
			});
		} catch (error) {
			if (!error.statusCode)
				error = new response.error(400, "Invalid inputs");
			next(error);
		}
	}
}
