const router = require('express').Router();
const controller = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', controller.authValidation, controller.register);
router.post('/login', controller.authValidation, controller.login);
router.post('/logout', controller.logout);
router.get('/me', protect, controller.me);

module.exports = router;
