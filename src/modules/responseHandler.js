// 4XX status code related to client side error
// 5XX status code related to server side error

const getErrorStatus = require('../constants/ErrorList');

function findErrorMessage(status) {
	return getErrorStatus.ERROR_STATUS_ARRAY.find(v => v.status == status) || { error: 'There must be an error' };
}

/**
		* Success Reponse.
		* @param {number} status - Success response status
		* @param {string} successMessage - Success response message
		* @param {any} data - Success response custom data
	*/
const successResponse = (status, successMessage, data) => {
	return {
		status,
		message: successMessage,
		data
	}
}


/**
		* Error Response.
		* @param {Response} res - Send error response
		* @param {number} statusCode - Error Status Code
	*/


const errorResponse = (statusCode) => {
	return findErrorMessage(statusCode);
}


module.exports = {
	errorResponse,
	successResponse,
};