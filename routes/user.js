const router = require('express').Router();
const {
  getUsers, getUserById, postUser, patchUserProfile, patchUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', postUser);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', patchUserAvatar);
module.exports = router;
