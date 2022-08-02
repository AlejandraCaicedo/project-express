const router = require('express').Router();
const { register } = require('./userController');
const { authMiddleware } = require('../../middlewares/auth');
const { registerMiddleware } = require('./requestValidators/register');

router.post('/register', authMiddleware, registerMiddleware, register);

module.exports = router;
