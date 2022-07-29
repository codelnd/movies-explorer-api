class UnauthorizedError extends Error {
  constructor(message = 'Необходимо авторизироваться.') {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = UnauthorizedError;
