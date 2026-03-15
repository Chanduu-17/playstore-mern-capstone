const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const controller = require('../controllers/notificationController');

router.get('/', protect, controller.getNotifications);
router.patch('/:id/read', protect, controller.markAsRead);

module.exports = router;
