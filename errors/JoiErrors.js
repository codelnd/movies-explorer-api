const { errors } = require('celebrate');
const { badRequest } = require('../utils/constants');

const joiErrors = errors({ message: badRequest });

module.exports = joiErrors;
