const glob = require('glob'); // GLOB - GET FILES WITH MATCH PATTERNS

module.exports = (app) => {
	glob(`${__dirname}/routes/**/*Route.js`, {}, (error, files) => {
		if (error) throw error;
		files.forEach((file) => require(file)(app));
	});
};

// GET ROUTE FILES AND RUN WITH EXPRESS APP