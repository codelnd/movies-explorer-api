const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { NODE_ENV, JWT_SECRET, SALT_ROUNDS } = process.env;
const { DEV_KEY } = require('../utils/config');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  const owner = req.user._id;

  User.findById({ owner })
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate({ owner }, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError())
    .then((updateUser) => res.send(updateUser))
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((sameEmail) => {
      if (sameEmail) {
        throw new ConflictError();
      }

      bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name, email, password: hash,
        }))
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
          _id: user._id.toString(),
        }))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then(() => {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Выполнен выход из аккаунта' });
    })
    .catch(next);
};
