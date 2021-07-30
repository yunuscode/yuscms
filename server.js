// Get npm packages
import Express from "express";
import DotEnv from "dotenv";
import { ErrorHandler, handleError } from "./src/helpers/handleError.js";
import routes from "./src/routes/routes.js";

// Get enviroment variables
DotEnv.config();

// Declare variables
const PORT = process.env.PORT || 5771;

// Server function
async function server() {
	// Run server
	const app = Express();
	app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	// Run middlewares
	app.use(Express.urlencoded({ extended: true }));
	app.use(Express.json());

	// new Error handler set to res
	app.use((req, res, next) => {
		res.error = ErrorHandler;
		next();
	});

	await routes(app);

	// Error handler section
	app.use((err, req, res, next) => {
		handleError(err, res);
	});
}

server();
