/*
	IMPORT FRAMEWORK AND LIBRARIES!
	IF YOU DON'T INSTALL PACKAGES, CMS WILL NOT WORK
	@author: @muhammadyunusuz
*/

const express = require('express'); // FRAMEWORK FOR HTTP SERVER
const cors = require('cors'); // FOR CORS CONTROL HTTP REQUESTS
const config = require('../config/env').env; // GET CONFIG FILE
const chalk = require('chalk'); // COLOR AND BACKGROUNDLY TEXTS ON CONSOLE
const routes = require('./routes'); // GET ROUTES

const app = express(); // RUN EXPRESS SERVER

const pack = require('../package'); // GET PACKAGE.JSON FILE



// CONFIGS AND SET MIDDLEWARES

app.use(cors()); // ALLOW ALL. IF YOU WANT CUSTOM SETTING => npm -> cors
app.use(express.json()); // \/
app.use(express.urlencoded({ extended: false })); // http://expressjs.com/en/resources/middleware/body-parser.html
app.use('/getFile', express.static('./assets')); // ENDPOINT FOR UPLOADS

// ADD ROUTES

routes(app);

// RUN SERVER

app.listen(config.port, () => {
	console.log(chalk.yellow(`/*`));
	console.log(chalk.red(`App name: ${config.name}`));
	console.log(chalk.red(`PORT: ${config.port}`));
	console.log(chalk.red(`App version: ${pack.version}`));
	console.log(chalk.green(`App start at: ${config.serverUrlWebUrlLink}`));
	console.log(chalk.yellow(`*/`));
})

