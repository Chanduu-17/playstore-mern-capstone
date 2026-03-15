const reviewController = require('../src/controllers/reviewController');
const reviewService = require('../src/services/reviewService');

jest.mock('../src/services/reviewService');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('reviewController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { appId: 'app123', reviewId: 'review123' },
            body: {},
            user: { _id: 'user123' }
        };
        res = mockRes();
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('addReview', () => {
        test('should add review successfully', async () => {
            req.body = { rating: 5, comment: 'Great app' };
            const review = {
                _id: 'review123',
                app: 'app123',
                user: 'user123',
                rating: 5,
                comment: 'Great app'
            };

            reviewService.addReview.mockResolvedValue(review);

            await reviewController.addReview(req, res, next);

            expect(reviewService.addReview).toHaveBeenCalledWith({
                appId: 'app123',
                userId: 'user123',
                rating: 5,
                comment: 'Great app'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: review });
        });

        test('should call next on error', async () => {
            const error = new Error('Add review failed');
            reviewService.addReview.mockRejectedValue(error);

            await reviewController.addReview(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getReviews', () => {
        test('should return reviews successfully', async () => {
            const reviews = [
                { _id: '1', rating: 5, comment: 'Excellent' },
                { _id: '2', rating: 4, comment: 'Good' }
            ];

            reviewService.getReviews.mockResolvedValue(reviews);

            await reviewController.getReviews(req, res, next);

            expect(reviewService.getReviews).toHaveBeenCalledWith('app123');
            expect(res.json).toHaveBeenCalledWith({ success: true, data: reviews });
        });

        test('should call next on error', async () => {
            const error = new Error('Fetch reviews failed');
            reviewService.getReviews.mockRejectedValue(error);

            await reviewController.getReviews(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteReview', () => {
        test('should delete review successfully', async () => {
            const result = { message: 'Review deleted successfully' };

            reviewService.deleteReview.mockResolvedValue(result);

            await reviewController.deleteReview(req, res, next);

            expect(reviewService.deleteReview).toHaveBeenCalledWith('review123', 'user123');
            expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
        });

        test('should call next on error', async () => {
            const error = new Error('Delete review failed');
            reviewService.deleteReview.mockRejectedValue(error);

            await reviewController.deleteReview(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
