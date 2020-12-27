const router = require('express').Router(); // Express Router
const StartController = require('./StartController')
const RoutesEndpoint = require('../../constants/RoutesEndpoint')

module.exports = app => {
	router.route('/get')
		.get(StartController.getInfo);

	app.use(
		RoutesEndpoint.START,
		router
	)
}