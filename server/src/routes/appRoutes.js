const router = require('express').Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const controller = require('../controllers/appController');

router.get('/', controller.getApps);
router.get('/:id', controller.getAppById);
router.post('/', protect, authorize('owner'), controller.createApp);
router.put('/:id', protect, authorize('owner'), controller.updateApp);
router.delete('/:id', protect, authorize('owner'), controller.deleteApp);
router.patch('/:id/visibility', protect, authorize('owner'), controller.toggleVisibility);
router.post('/:id/download', protect, authorize('user', 'owner'), controller.downloadApp);
router.post('/:id/announce-update', protect, authorize('owner'), controller.announceUpdate);

module.exports = router;
