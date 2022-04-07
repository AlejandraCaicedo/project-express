const error = (err, res, req, next) => {
	const errorCode = err.status || 500;
	return res.status(errorCode).send({
		status: errorCode,
		uri: req,
		message: err.message || 'Internal server error',
	});
};

module.exports = error;
