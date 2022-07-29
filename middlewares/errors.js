const NotFoundError = require('../errors/NotFoundError');

module.exports.serverError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка!' : message,
  });
  next();
};

module.exports.notFoundPage = (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
};
