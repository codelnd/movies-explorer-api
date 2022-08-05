const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');

module.exports.handleErrors = (err, req, res, next) => {
  if (err.code === 11000) {
    const error = new ConflictError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    const error = new BadRequestError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

  const status = err.statusCode || 500;
  const { message } = err;

  res.status(status).json({ err: message || 'На сервере произошла ошибка.' });
  next();
};

module.exports.notFoundPage = (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
};
