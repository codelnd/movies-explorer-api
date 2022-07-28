const router = require('express').Router();
const usersRouter = require('./users');
const { register, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/signup', register);
router.post('/signin', login);
router.post('/signout', auth, logout);

router.use('/users', auth, usersRouter);

module.exports = router;
