const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected and restricted to owners
router.use(protect);
router.use(authorize('owner'));

router.get('/users', userController.getAllUsers);
router.patch('/users/:id/promote', userController.promoteToAdmin);

module.exports = router;
