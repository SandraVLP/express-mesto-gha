const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', postCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
