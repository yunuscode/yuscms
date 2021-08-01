import Joi from "joi";

export class Validations {
	static async UserCreateAccountValidation() {
		return await Joi.object({
			name: Joi.string()
				.alphanum()
				.required()
				.error(new Error("Name is invalid"))
				.min(4)
				.max(64),
			password: Joi.string()
				.required()
				.min(4)
				.max(64)
				.error(new Error("Password is invalid")),
			username: Joi.string()
				.required()
				.min(5)
				.lowercase()
				.max(20)
				.error(new Error("Invalid username"))
				.pattern(/^[a-zA-Z]{5,}\d*$/i),
		});
	}
	static async UserLoginAccountValidation() {
		return await Joi.object({
			password: Joi.string()
				.required()
				.min(4)
				.max(64)
				.error(new Error("Password is invalid")),
			username: Joi.string()
				.required()
				.min(5)
				.lowercase()
				.max(20)
				.error(new Error("Invalid username"))
				.pattern(/^[a-zA-Z]{5,}\d*$/i),
		});
	}
}
