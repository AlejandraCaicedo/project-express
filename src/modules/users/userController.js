const register = (req, res) => {
	res.json({ module: 'users' });
	//registerUseCase.register(req.body)
};

module.exports = {
	register,
};
