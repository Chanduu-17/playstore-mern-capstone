const Contact = require('../models/Contact');
const User = require('../models/User');
const { createNotification } = require('../services/notificationService');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
        }

        const newContact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        // Notify all owners
        const owners = await User.find({ role: 'owner' });
        const notificationPromises = owners.map(owner => 
            createNotification({
                user: owner._id,
                title: 'New Contact Form Message',
                message: `You have received a new message from ${name} (${email}): "${message}"`,
                type: 'system'
            })
        );
        await Promise.all(notificationPromises);

        res.status(201).json({ success: true, message: 'Message sent successfully!', data: newContact });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
};
