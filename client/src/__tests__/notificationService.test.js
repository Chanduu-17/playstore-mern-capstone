import api from '../services/api';
import {
    fetchNotifications,
    markNotificationRead
} from '../services/notificationService';

jest.mock('../services/api', () => ({
    get: jest.fn(),
    patch: jest.fn()
}));

describe('notificationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchNotifications should call GET /notifications', async () => {
        const mockData = [
            { _id: '1', title: 'Notification 1' },
            { _id: '2', title: 'Notification 2' }
        ];

        api.get.mockResolvedValue({ data: { data: mockData } });

        const result = await fetchNotifications();

        expect(api.get).toHaveBeenCalledWith('/notifications');
        expect(result).toEqual(mockData);
    });

    test('markNotificationRead should call PATCH /notifications/:id/read', async () => {
        const mockData = { _id: '1', isRead: true };

        api.patch.mockResolvedValue({ data: { data: mockData } });

        const result = await markNotificationRead('1');

        expect(api.patch).toHaveBeenCalledWith('/notifications/1/read');
        expect(result).toEqual(mockData);
    });
});
