const { errors } = require('celebrate');

module.exports.joiErrors = errors({ message: 'Переданы некорректные данные.' });
