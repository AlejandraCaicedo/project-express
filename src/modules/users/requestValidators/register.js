const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
	email: Joi.string().min(6).max(200).required().email(),
	password: Joi.string().min(4).max(1000).required(),
	company: Joi.string().min(3).max(255).required(),
});

const registerMiddleware = (req, res, next) => {
	const { error } = schemaRegister.validate(req.body);
	if (error) return res.status(401).json({ status: false, error: error.details });
	next();
};

module.exports = {
	registerMiddleware,
};
