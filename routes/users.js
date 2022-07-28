const usersRouter = require('express').Router();
const {getUser, updateUser, createUser} = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.post('/', createUser);



module.exports = usersRouter;
