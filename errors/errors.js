const NotFoundError = require('./NotFoundError');

module.exports.handleErrors = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;

  res.status(status).json({ err: message || 'На сервере произошла ошибка.' });
  return next();
};

module.exports.notFoundPage = (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
};
