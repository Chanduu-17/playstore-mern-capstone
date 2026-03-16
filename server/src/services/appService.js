const mongoose = require('mongoose');
const App = require('../models/App');
const Review = require('../models/Review');
const User = require('../models/User');
const appDto = require('../dto/appDto');
const { createNotification } = require('./notificationService');

exports.getApps = async (query) => {
  const filter = { visible: true };
  if (query.category) filter.category = query.category;
  if (query.search) filter.name = { $regex: query.search, $options: 'i' };
  if (query.ownerId) filter.owner = query.ownerId;
  if (query.includeHidden === 'true') delete filter.visible;

  let apps = await App.find(filter).populate('owner', 'name email');
  if (query.rating) apps = apps.filter(app => app.ratingAverage >= Number(query.rating));
  return apps.map(appDto);
};

exports.getAppById = async (id) => {
  const app = await App.findById(id).populate('owner', 'name email');
  if (!app) throw new Error('App not found');
  return appDto(app);
};

exports.createApp = async (payload, ownerId) => {
  const app = await App.create({ ...payload, owner: ownerId });
  return appDto(app);
};

exports.updateApp = async (id, payload, ownerId) => {
  const app = await App.findOne({ _id: id, owner: ownerId });

  if (!app) throw new Error('App not found or not owned by you');

  const allowedFields = [
    'name',
    'description',
    'version',
    'category',
    'genre',
    'releaseDate',
    'imageUrl',
    'features'
  ];

  allowedFields.forEach(field => {
    if (payload[field] !== undefined) {
      app[field] = payload[field];
    }
  });

  await app.save();

  return appDto(app);
};

// exports.updateApp = async (id, payload, ownerId) => {
//   const app = await App.findOne({ _id: id, owner: ownerId });
//   if (!app) throw new Error('App not found or not owned by you');
//   Object.assign(app, payload);
//   await app.save();
//   return appDto(app);
// };

exports.deleteApp = async (id, ownerId) => {
  const app = await App.findOne({ _id: id, owner: ownerId });
  if (!app) throw new Error('App not found or not owned by you');
  await Review.deleteMany({ app: app._id });
  await app.deleteOne();
  return { message: 'App deleted successfully' };
};

exports.toggleVisibility = async (id, ownerId, visible) => {
  const app = await App.findOne({ _id: id, owner: ownerId });
  if (!app) throw new Error('App not found or not owned by you');
  app.visible = visible;
  await app.save();
  return appDto(app);
};

exports.downloadApp = async (appId, userId) => {
  const app = await App.findById(appId);
  if (!app || !app.visible) throw new Error('App not found');
  const user = await User.findById(userId);
  if (!user.downloadedApps.some(id => id.toString() === appId)) {
    user.downloadedApps.push(appId);
    await user.save();
    app.downloadCount += 1;
    await app.save();
  }
  await createNotification({
    user: app.owner,
    title: 'New app download',
    message: `${user.name} downloaded ${app.name}`,
    type: 'download',
    relatedApp: app._id
  });
  return { message: 'App downloaded successfully', downloadCount: app.downloadCount };
};

exports.announceUpdate = async (appId, ownerId, message) => {
  if (!mongoose.Types.ObjectId.isValid(appId)) throw new Error('Invalid app ID');
  const app = await App.findOne({ _id: appId, owner: ownerId });
  if (!app) throw new Error('App not found or not owned by you');
  const users = await User.find({ role: 'user' });
  await Promise.all(users.map(user => createNotification({
    user: user._id,
    title: `Update for ${app.name}`,
    message,
    type: 'update',
    relatedApp: app._id
  })));
  return { message: 'Update announcement sent', notifiedUsers: users.length };
};
