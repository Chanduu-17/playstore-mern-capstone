import api from '../services/api';
import {
    fetchApps,
    fetchAppById,
    createApp,
    updateApp,
    deleteApp,
    toggleVisibility,
    downloadApp,
    announceUpdate
} from '../services/appService';

jest.mock('../services/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
}));

describe('appService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchApps should call GET /apps with params', async () => {
        const mockData = [{ name: 'App 1' }];
        api.get.mockResolvedValue({ data: { data: mockData } });

        const result = await fetchApps({ search: 'test' });

        expect(api.get).toHaveBeenCalledWith('/apps', { params: { search: 'test' } });
        expect(result).toEqual(mockData);
    });

    test('fetchAppById should call GET /apps/:id', async () => {
        const mockData = { _id: '1', name: 'App 1' };
        api.get.mockResolvedValue({ data: { data: mockData } });

        const result = await fetchAppById('1');

        expect(api.get).toHaveBeenCalledWith('/apps/1');
        expect(result).toEqual(mockData);
    });

    test('createApp should call POST /apps', async () => {
        const payload = { name: 'New App', category: 'games' };
        const mockData = { _id: '1', ...payload };
        api.post.mockResolvedValue({ data: { data: mockData } });

        const result = await createApp(payload);

        expect(api.post).toHaveBeenCalledWith('/apps', payload);
        expect(result).toEqual(mockData);
    });

    test('updateApp should call PUT /apps/:id', async () => {
        const payload = { name: 'Updated App' };
        const mockData = { _id: '1', ...payload };
        api.put.mockResolvedValue({ data: { data: mockData } });

        const result = await updateApp('1', payload);

        expect(api.put).toHaveBeenCalledWith('/apps/1', payload);
        expect(result).toEqual(mockData);
    });

    test('deleteApp should call DELETE /apps/:id', async () => {
        const mockData = { success: true, message: 'Deleted successfully' };
        api.delete.mockResolvedValue({ data: mockData });

        const result = await deleteApp('1');

        expect(api.delete).toHaveBeenCalledWith('/apps/1');
        expect(result).toEqual(mockData);
    });

    test('toggleVisibility should call PATCH /apps/:id/visibility', async () => {
        const mockData = { _id: '1', visible: false };
        api.patch.mockResolvedValue({ data: { data: mockData } });

        const result = await toggleVisibility('1', false);

        expect(api.patch).toHaveBeenCalledWith('/apps/1/visibility', { visible: false });
        expect(result).toEqual(mockData);
    });

    test('downloadApp should call POST /apps/:id/download', async () => {
        const mockData = { success: true, message: 'Downloaded successfully' };
        api.post.mockResolvedValue({ data: mockData });

        const result = await downloadApp('1');

        expect(api.post).toHaveBeenCalledWith('/apps/1/download');
        expect(result).toEqual(mockData);
    });

    test('announceUpdate should call POST /apps/:id/announce-update', async () => {
        const mockData = { success: true, message: 'Announcement sent' };
        api.post.mockResolvedValue({ data: mockData });

        const result = await announceUpdate('1', 'New update available');

        expect(api.post).toHaveBeenCalledWith('/apps/1/announce-update', {
            message: 'New update available'
        });
        expect(result).toEqual(mockData);
    });
});
