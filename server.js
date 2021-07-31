// Get npm packages
import Express from "express";
import DotEnv from "dotenv";
import { ErrorHandler, handleError } from "./src/helpers/handleError.js";
import routes from "./src/routes/routes.js";
import Path from "path";
import { postgres } from "./src/modules/postgres.js";

// Get enviroment variables
DotEnv.config({
	path: Path.join(Path.resolve(), ".env"),
});

// Declare variables
const PORT = process.env.PORT || 5771;

// Server function
async function server() {
	let db = await postgres();
	// Run server
	const app = Express();
	app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	// Run middlewares
	app.use(Express.urlencoded({ extended: true }));
	app.use(Express.json());

	// new Error handler set to res
	app.use((req, res, next) => {
		res.error = ErrorHandler;
		req.db = db;
		next();
	});

	await routes(app);

	await app.use((req, res, next) => {
		next(new ErrorHandler(404, "Not found"));
	});

	// Error handler section
	await app.use((err, req, res, next) => {
		handleError(err, res);
	});
}

server();
