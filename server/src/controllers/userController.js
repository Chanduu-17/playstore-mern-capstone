const User = require('../models/User');
const App = require('../models/App');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let populatedUser = user.toObject();

        if (user.role === 'user') {
            // Populate downloaded apps for standard users
            const userWithApps = await User.findById(req.user._id).select('-password').populate('downloadedApps');
            populatedUser.downloadedApps = userWithApps.downloadedApps;
        } else if (user.role === 'owner') {
            // Fetch apps uploaded by the owner
            const uploadedApps = await App.find({ owner: req.user._id });
            populatedUser.uploadedApps = uploadedApps;
        }

        res.json({ success: true, user: populatedUser });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        
        // Find user and update
        // We do not allow role or password updates here for simplicity and security
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: updatedUser, message: 'Profile updated successfully' });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email is already in use' });
        }
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

exports.promoteToAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.role = 'admin';
        await user.save();

        res.json({ success: true, message: 'User promoted to admin successfully' });
    } catch (error) {
        next(error);
    }
};
