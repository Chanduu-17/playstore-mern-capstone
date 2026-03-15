import api from '../services/api';
import { fetchReviews, addReview } from '../services/reviewService';

jest.mock('../services/api', () => ({
    get: jest.fn(),
    post: jest.fn()
}));

describe('reviewService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchReviews should call GET /reviews/:appId', async () => {
        const mockData = [
            { _id: '1', rating: 5, comment: 'Excellent app' },
            { _id: '2', rating: 4, comment: 'Very good' }
        ];

        api.get.mockResolvedValue({ data: { data: mockData } });

        const result = await fetchReviews('app123');

        expect(api.get).toHaveBeenCalledWith('/reviews/app123');
        expect(result).toEqual(mockData);
    });

    test('addReview should call POST /reviews/:appId', async () => {
        const payload = { rating: 5, comment: 'Excellent app' };
        const mockData = { _id: '1', app: 'app123', ...payload };

        api.post.mockResolvedValue({ data: { data: mockData } });

        const result = await addReview('app123', payload);

        expect(api.post).toHaveBeenCalledWith('/reviews/app123', payload);
        expect(result).toEqual(mockData);
    });
});
