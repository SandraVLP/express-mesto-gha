const mongoose = require('mongoose');
const validator = require('validator');

const urlRegExp = '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$';

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (v) => {
        validator.isURL(v);
        urlRegExp.test(v);
      },
      message: 'Некорректный URL',
    },
    // validate: {
    //   validator: (v) => urlRegExp.test(v),
    //   message: 'Поле "link" должно быть валидным url-адресом.',
    // },
  },
  owner: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
    required: true,
  },
  // likes: {
  //   type: mongoose.ObjectId,
  //   default: {},
  //   required: true,
  //   ref: user,
  createdAt: {
    type: mongoose.Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
