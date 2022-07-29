class ConflictError extends Error {
  constructor(message = 'Данный e-mail уже зарегистрирован.') {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

module.exports = ConflictError;
