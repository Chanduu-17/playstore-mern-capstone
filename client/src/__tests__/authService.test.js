import api from '../services/api';
import { registerUser, loginUser } from '../services/authService';

jest.mock('../services/api', () => ({
    post: jest.fn()
}));

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('registerUser calls register api', async () => {
        const mockData = { user: { name: 'Test' }, token: '123' };
        api.post.mockResolvedValue({ data: mockData });

        const result = await registerUser({
            name: 'Test',
            email: 'test@mail.com',
            password: 'pass@123',
            role: 'user'
        });

        expect(api.post).toHaveBeenCalledWith('/auth/register', {
            name: 'Test',
            email: 'test@mail.com',
            password: 'pass@123',
            role: 'user'
        });
        expect(result).toEqual(mockData);
    });

    test('loginUser calls login api', async () => {
        const mockData = { user: { name: 'Test' }, token: '123' };
        api.post.mockResolvedValue({ data: mockData });

        const result = await loginUser({
            email: 'test@mail.com',
            password: 'pass@123'
        });

        expect(api.post).toHaveBeenCalledWith('/auth/login', {
            email: 'test@mail.com',
            password: 'pass@123'
        });
        expect(result).toEqual(mockData);
    });
});
