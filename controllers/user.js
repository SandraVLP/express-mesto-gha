const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500)
          .send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(500)
          .send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500)
          .send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.patchUserProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.statusCode === 404) {
        res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500)
          .send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.patchUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.message === 'NotFound') {
        res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500)
          .send({ message: 'Произошла неизвестная ошибка.' });
      }
    });
};
