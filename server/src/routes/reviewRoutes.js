const router = require('express').Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const controller = require('../controllers/reviewController');

router.get('/owner', protect, authorize('owner'), controller.getOwnerReviews);
router.get('/:appId', controller.getReviews);
router.post('/:appId', protect, authorize('user'), controller.addReview);
router.delete('/item/:reviewId', protect, authorize('user'), controller.deleteReview);

module.exports = router;
