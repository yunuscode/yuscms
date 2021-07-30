// Get npm packages
import Express from "express";
import DotEnv from "dotenv";
import Fs from "fs";
import Path from "path";

// Get enviroment variables
DotEnv.config();

// Declare variables
const PORT = process.env.PORT || 5771;
const homedir = Path.resolve();

// Server function
async function server() {
	// Run server
	const app = Express();
	app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	// Run middlewares
	app.use(Express.urlencoded({ extended: true }));
	app.use(Express.json());

	// Get Router and run || Custom GLOB collector
	const routerDirectory = Path.join(homedir, "src", "routes");
	Fs.readdir(routerDirectory, (err, routeFiles) => {
		if (err) throw new Error("Routes path not found");

		routeFiles.forEach(async (routeName) => {
			const routeFile = Path.join(homedir, "src", "routes", routeName);
			const route = await import(routeFile);
			if (route.default.path && route.default.router) {
				app.use(route.default.path, route.default.router);
			} else {
				console.warn(routeName + "'s router or path name not found.");
			}
		});
	});
}

server();
