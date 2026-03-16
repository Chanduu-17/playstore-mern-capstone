const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const authService = require('../services/authService');

exports.authValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validateRequest
];

exports.register = async (req, res, next) => {
  try {
    const { user } = await authService.register(req.body);
    res.status(201).json({ success: true, message: 'Registration successful. Please login.', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role, downloadedApps: user.downloadedApps } });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => res.json({ success: true, message: 'Logout successful. Clear token on client.' });
exports.me = async (req, res) => res.json({ success: true, user: req.user });
