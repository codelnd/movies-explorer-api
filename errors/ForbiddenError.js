class ForbiddenError extends Error {
  constructor(message = 'Недостаточно прав для этого действия.') {
    super(message);
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = ForbiddenError;
