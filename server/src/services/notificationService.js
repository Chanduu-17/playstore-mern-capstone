const Notification = require('../models/Notification');

exports.createNotification = async ({ user, title, message, type = 'system', relatedApp = null }) => {
  return Notification.create({ user, title, message, type, relatedApp });
};
