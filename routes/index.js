const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { register, login, logout } = require('../controllers/users');
const { notFoundPage } = require('../errors/errors');
const { registerJoiValidation, loginJoiValidation } = require('../middlewares/joiValidation');

router.post('/signup', registerJoiValidation, register);
router.post('/signin', loginJoiValidation, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signout', auth, logout);
router.use('*', auth, notFoundPage);

module.exports = router;
