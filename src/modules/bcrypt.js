import { genSalt, hash, compare } from "bcrypt";

export async function createNewHash(data) {
	return await hash(data, genSalt(10));
}

export async function compare(data, hash) {
	return await compare(data, hash);
}
