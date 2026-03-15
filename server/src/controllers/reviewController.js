const reviewService = require('../services/reviewService');

exports.addReview = async (req, res, next) => {
  try {
    const review = await reviewService.addReview({ appId: req.params.appId, userId: req.user._id, ...req.body });
    res.status(201).json({ success: true, data: review });
  } catch (error) { next(error); }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews(req.params.appId);
    res.json({ success: true, data: reviews });
  } catch (error) { next(error); }
};

exports.getOwnerReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getOwnerReviews(req.user._id);
    res.json({ success: true, data: reviews });
  } catch (error) { next(error); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(req.params.reviewId, req.user._id);
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
};
