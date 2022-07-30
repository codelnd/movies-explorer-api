const { errors } = require('celebrate');

const joiErrors = errors({ message: 'Переданы некорректные данные.' });

module.exports = joiErrors;
