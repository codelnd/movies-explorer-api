const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserJoiValidation } = require('../middlewares/joiValidation');

router.get('/me', getUser);
router.patch('/me', updateUserJoiValidation, updateUser);

module.exports = router;
