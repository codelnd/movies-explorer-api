const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');

module.exports.handleErrors = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    const error = new BadRequestError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }
  if (err.code === 11000) {
    const error = new ConflictError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка!' : message,
  });
  next();
};

module.exports.notFoundPage = (req, res, next) => {
  next(new NotFoundError('Страницы не существует.'));
};
