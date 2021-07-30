export class ErrorHandler extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export function handleError(error, response) {
	const { statusCode, message } = error;

	response.status(statusCode).json({
		ok: false,
		code: statusCode,
		message: message,
	});
}
