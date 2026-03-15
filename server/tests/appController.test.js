const appController = require('../src/controllers/appController');
const appService = require('../src/services/appService');

jest.mock('../src/services/appService');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('appController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
            params: { id: 'app123' },
            body: {},
            user: { _id: 'user123' }
        };
        res = mockRes();
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('getApps', () => {
        test('should return apps successfully', async () => {
            const apps = [{ name: 'App One' }];
            appService.getApps.mockResolvedValue(apps);

            await appController.getApps(req, res, next);

            expect(appService.getApps).toHaveBeenCalledWith(req.query);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: apps });
        });

        test('should call next on error', async () => {
            const error = new Error('Failed');
            appService.getApps.mockRejectedValue(error);

            await appController.getApps(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getAppById', () => {
        test('should return app by id', async () => {
            const app = { _id: 'app123', name: 'Test App' };
            appService.getAppById.mockResolvedValue(app);

            await appController.getAppById(req, res, next);

            expect(appService.getAppById).toHaveBeenCalledWith('app123');
            expect(res.json).toHaveBeenCalledWith({ success: true, data: app });
        });

        test('should call next on error', async () => {
            const error = new Error('Not found');
            appService.getAppById.mockRejectedValue(error);

            await appController.getAppById(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('createApp', () => {
        test('should create app successfully', async () => {
            req.body = { name: 'New App' };
            const app = { _id: 'app123', name: 'New App' };
            appService.createApp.mockResolvedValue(app);

            await appController.createApp(req, res, next);

            expect(appService.createApp).toHaveBeenCalledWith(req.body, 'user123');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: app });
        });

        test('should call next on error', async () => {
            const error = new Error('Create failed');
            appService.createApp.mockRejectedValue(error);

            await appController.createApp(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateApp', () => {
        test('should update app successfully', async () => {
            req.body = { name: 'Updated App' };
            const app = { _id: 'app123', name: 'Updated App' };
            appService.updateApp.mockResolvedValue(app);

            await appController.updateApp(req, res, next);

            expect(appService.updateApp).toHaveBeenCalledWith('app123', req.body, 'user123');
            expect(res.json).toHaveBeenCalledWith({ success: true, data: app });
        });

        test('should call next on error', async () => {
            const error = new Error('Update failed');
            appService.updateApp.mockRejectedValue(error);

            await appController.updateApp(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteApp', () => {
        test('should delete app successfully', async () => {
            const result = { message: 'App deleted successfully' };
            appService.deleteApp.mockResolvedValue(result);

            await appController.deleteApp(req, res, next);

            expect(appService.deleteApp).toHaveBeenCalledWith('app123', 'user123');
            expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
        });

        test('should call next on error', async () => {
            const error = new Error('Delete failed');
            appService.deleteApp.mockRejectedValue(error);

            await appController.deleteApp(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('toggleVisibility', () => {
        test('should toggle visibility successfully', async () => {
            req.body = { visible: false };
            const app = { _id: 'app123', visible: false };
            appService.toggleVisibility.mockResolvedValue(app);

            await appController.toggleVisibility(req, res, next);

            expect(appService.toggleVisibility).toHaveBeenCalledWith('app123', 'user123', false);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: app });
        });

        test('should call next on error', async () => {
            const error = new Error('Visibility failed');
            appService.toggleVisibility.mockRejectedValue(error);

            await appController.toggleVisibility(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('downloadApp', () => {
        test('should download app successfully', async () => {
            const result = { message: 'App downloaded successfully' };
            appService.downloadApp.mockResolvedValue(result);

            await appController.downloadApp(req, res, next);

            expect(appService.downloadApp).toHaveBeenCalledWith('app123', 'user123');
            expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
        });

        test('should call next on error', async () => {
            const error = new Error('Download failed');
            appService.downloadApp.mockRejectedValue(error);

            await appController.downloadApp(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('announceUpdate', () => {
        test('should announce update successfully', async () => {
            req.body = { message: 'New version released' };
            const result = { message: 'Announcement sent successfully' };
            appService.announceUpdate.mockResolvedValue(result);

            await appController.announceUpdate(req, res, next);

            expect(appService.announceUpdate).toHaveBeenCalledWith('app123', 'user123', 'New version released');
            expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
        });

        test('should call next on error', async () => {
            const error = new Error('Announcement failed');
            appService.announceUpdate.mockRejectedValue(error);

            await appController.announceUpdate(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
