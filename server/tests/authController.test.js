const authController = require('../src/controllers/authController');
const authService = require('../src/services/authService');
const crypto = require('crypto');

jest.mock('../src/services/authService');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('authController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            user: {
                _id: 'user123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user'
            }
        };
        res = mockRes();
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('register', () => {
        test('should register user successfully', async () => {
            req.body = { name: 'John', email: 'john@example.com', password: 'secret123' };
            const mockUser = {
                _id: 'user123',
                name: 'John',
                email: 'john@example.com',
                role: 'user'
            };

            authService.register.mockResolvedValue({ user: mockUser });

            await authController.register(req, res, next);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Registration successful. Please login.',
                user: {
                    id: mockUser._id,
                    name: mockUser.name,
                    email: mockUser.email,
                    role: mockUser.role
                }
            });
        });

        test('should call next on register error', async () => {
            const error = new Error('Register failed');
            authService.register.mockRejectedValue(error);

            await authController.register(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('login', () => {
        test('should login user successfully', async () => {
            req.body = {
                email: 'john@example.com',
                password: 'secret123'
            };

            const serviceResponse = {
                user: {
                    _id: 'user123',
                    name: 'John',
                    email: 'john@example.com',
                    role: 'owner'
                },
                token: 'login-token'
            };

            authService.login.mockResolvedValue(serviceResponse);

            await authController.login(req, res, next);

            expect(authService.login).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                token: 'login-token',
                user: {
                    id: 'user123',
                    name: 'John',
                    email: 'john@example.com',
                    role: 'owner'
                }
            });
        });

        test('should call next on login error', async () => {
            const error = new Error('Login failed');
            authService.login.mockRejectedValue(error);

            await authController.login(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('logout', () => {
        test('should logout successfully', async () => {
            await authController.logout(req, res);

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Logout successful. Clear token on client.'
            });
        });
    });

    describe('me', () => {
        test('should return current user', async () => {
            await authController.me(req, res);

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                user: req.user
            });
        });
    });

    describe('me', () => {
        test('should return current user', async () => {
            await authController.me(req, res);

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                user: req.user
            });
        });
    });
});
