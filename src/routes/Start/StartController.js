const reqResponse = require('../../modules/responseHandler');


module.exports = {
	getInfo: async (req, res) => {
		res.status(201).send(reqResponse.successResponse(201, "Server is ready", "Server is ready for working"))
	}
}
