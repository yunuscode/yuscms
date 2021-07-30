import { verify, sign } from "jsonwebtoken";

export function signJwtToken(data) {
	return sign(data, process.env.SECRET_WORD);
}

export function verifyJwtToken(token) {
	try {
		return verify(token, process.env.SECRET_WORD);
	} catch (error) {
		return false;
	}
}
