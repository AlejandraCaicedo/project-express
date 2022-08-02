const { APP_KEY, AUTH_EMAIL } = require('../config');
const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) => {
	const { email } = req.body;

	if (email !== AUTH_EMAIL) return next(new Error('Email invalid'));

	const token = jwt.sign({ email }, APP_KEY);
	res.json({ status: 200, token });
};

const authMiddleware = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res
			.status(400)
			.json({ status: 400, message: 'User not authorized' });

	try {
		const verified = jwt.verify(authorization, APP_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(401).json({ status: 401, message: 'Invalid token' });
	}
};

module.exports = {
	generateToken,
	authMiddleware,
};
