const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');
const { SERVER_ERR, pageNotFound, serverErr } = require('../utils/constants');

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

  const status = err.statusCode || SERVER_ERR;
  const { message } = err;

  res.status(status).json({ err: message || serverErr });
  next();
};

module.exports.notFoundPage = (req, res, next) => {
  next(new NotFoundError(pageNotFound));
};
