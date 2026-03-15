const Review = require('../models/Review');
const App = require('../models/App');

async function syncRating(appId) {
  const reviews = await Review.find({ app: appId });
  const total = reviews.reduce((sum, item) => sum + item.rating, 0);
  const avg = reviews.length ? Number((total / reviews.length).toFixed(1)) : 0;
  await App.findByIdAndUpdate(appId, { ratingAverage: avg, ratingCount: reviews.length });
}

exports.addReview = async ({ appId, userId, rating, comment }) => {
  const app = await App.findById(appId);
  if (!app) throw new Error('App not found');
  const existing = await Review.findOne({ app: appId, user: userId });
  if (existing) throw new Error('Review already submitted for this app');
  const review = await Review.create({ app: appId, user: userId, rating, comment });
  await syncRating(appId);
  return review;
};

exports.getReviews = async appId => Review.find({ app: appId }).populate('user', 'name email').sort({ createdAt: -1 });

exports.getOwnerReviews = async ownerId => {
  const apps = await App.find({ owner: ownerId }).select('_id name');
  const appIds = apps.map(app => app._id);
  return Review.find({ app: { $in: appIds } })
    .populate('user', 'name email')
    .populate('app', 'name')
    .sort({ createdAt: -1 });
};

exports.deleteReview = async (reviewId, userId) => {
  const review = await Review.findOne({ _id: reviewId, user: userId });
  if (!review) throw new Error('Review not found');
  const appId = review.app;
  await review.deleteOne();
  await syncRating(appId);
  return { message: 'Review deleted successfully' };
};
