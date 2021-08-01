import { genSalt, compare } from "bcrypt";

export async function createNewHash(data) {
	return await hash(data, await genSalt(10));
}

export async function compareHash(data, hash) {
	return await compare(data, hash);
}
