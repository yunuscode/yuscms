import JWT from "jsonwebtoken";

export function signJwtToken(data) {
	return JWT.sign(data, process.env.SECRET_WORD);
}

export function verifyJwtToken(token) {
	try {
		return JWT.verify(token, process.env.SECRET_WORD);
	} catch (error) {
		return false;
	}
}
