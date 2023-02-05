const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, patchUserProfile, patchUserAvatar, login, createUser, getUser,
} = require('../controllers/user');

router.get('/', auth, getUsers);
router.get('/me', auth, getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
  }),
}), auth, getUserById);
router.patch('/me', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, patchUserProfile);
router.patch('/me/avatar', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    link: Joi.string().required().uri(),
  }),
}), auth, patchUserAvatar);

router.post('/signin', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/signup', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;
