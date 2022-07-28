const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { User } = require('../models/user');
const { BadRequestError } = require('../utils/BadRequestError');
const ConflictError = require('../utils/ConflictError');

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.params._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

module.exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((sameEmail) => {
      if (sameEmail) {
        throw new ConflictError('Email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id.toString(),
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({
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

// module.exports.register = (req, res) => {
//   const { name, email, password } = req.body;
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         return res.status(409).send({ message: 'Пользователь существует' });
//       }
//       return User.create({ name, email, password });
//     })
//     .then((newUser) => {
//       console.log(newUser);
//
//       res.send({ message: 'Пользователь создан' });
//     });
// };
