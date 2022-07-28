const {User} = require('../models/user');

module.exports.getUser = (req, res) => {
  console.log(req.params)
  User.findById(req.params._id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
};


module.exports.updateUser = (req, res, next) => {
  const {name, email} = req.body;
  User.findByIdAndUpdate(req.params._id, {name, email}, {new: true, runValidators: true})
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
}

// module.exports.createUser = (req, res) => {
//   const { name, email } = req.body;
//
//   User.create({ name, email })
//     // вернём записанные в базу данные
//     .then(user => res.send({
//       name: user.name,
//       email: user.email
//     }))
//     // данные не записались, вернём ошибку
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// }
