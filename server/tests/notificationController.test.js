const notificationController = require('../src/controllers/notificationController');
const Notification = require('../src/models/Notification');

jest.mock('../src/models/Notification');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('notificationController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: 'notif123' },
            user: { _id: 'user123' }
        };
        res = mockRes();
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('getNotifications', () => {
        test('should return notifications successfully', async () => {
            const notifications = [
                { _id: '1', title: 'Test 1' },
                { _id: '2', title: 'Test 2' }
            ];

            const populate = jest.fn().mockResolvedValue(notifications);
            const sort = jest.fn().mockReturnValue({ populate });
            Notification.find.mockReturnValue({ sort });

            await notificationController.getNotifications(req, res, next);

            expect(Notification.find).toHaveBeenCalledWith({ user: 'user123' });
            expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
            expect(populate).toHaveBeenCalledWith('relatedApp', 'name');
            expect(res.json).toHaveBeenCalledWith({ success: true, data: notifications });
        });

        test('should call next on error', async () => {
            const error = new Error('Fetch failed');
            const sort = jest.fn(() => {
                throw error;
            });
            Notification.find.mockReturnValue({ sort });

            await notificationController.getNotifications(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('markAsRead', () => {
        test('should mark notification as read', async () => {
            const notification = {
                _id: 'notif123',
                user: 'user123',
                isRead: true
            };

            Notification.findOneAndUpdate.mockResolvedValue(notification);

            await notificationController.markAsRead(req, res, next);

            expect(Notification.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: 'notif123', user: 'user123' },
                { isRead: true },
                { new: true }
            );
            expect(res.json).toHaveBeenCalledWith({ success: true, data: notification });
        });

        test('should return 404 if notification not found', async () => {
            Notification.findOneAndUpdate.mockResolvedValue(null);

            await notificationController.markAsRead(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Notification not found'
            });
        });

        test('should call next on error', async () => {
            const error = new Error('Update failed');
            Notification.findOneAndUpdate.mockRejectedValue(error);

            await notificationController.markAsRead(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
