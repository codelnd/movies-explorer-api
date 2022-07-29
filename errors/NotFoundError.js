class NotFoundError extends Error {
  constructor(message = 'Запрашиваемых данных не существует.') {
    super(message);
    this.statusCode = 404;
    this.message = message;
  }
}

module.exports = NotFoundError;
