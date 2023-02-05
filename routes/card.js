const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');

router.get('/', auth, getCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
  }),
}), auth, deleteCard);
router.post('/', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
}), auth, postCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
  }),
}), auth, putLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
  }),
}), auth, deleteLike);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
