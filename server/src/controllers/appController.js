const appService = require('../services/appService');

exports.getApps = async (req, res, next) => {
  try {
    const apps = await appService.getApps(req.query);
    res.json({ success: true, data: apps });
  } catch (error) { next(error); }
};

exports.getAppById = async (req, res, next) => {
  try {
    const app = await appService.getAppById(req.params.id);
    res.json({ success: true, data: app });
  } catch (error) { next(error); }
};

exports.createApp = async (req, res, next) => {
  try {
    const app = await appService.createApp(req.body, req.user._id);
    res.status(201).json({ success: true, data: app });
  } catch (error) { next(error); }
};

exports.updateApp = async (req, res, next) => {
  try {
    const app = await appService.updateApp(req.params.id, req.body, req.user._id);
    res.json({ success: true, data: app });
  } catch (error) { next(error); }
};

exports.deleteApp = async (req, res, next) => {
  try {
    const result = await appService.deleteApp(req.params.id, req.user._id);
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
};

exports.toggleVisibility = async (req, res, next) => {
  try {
    const app = await appService.toggleVisibility(req.params.id, req.user._id, req.body.visible);
    res.json({ success: true, data: app });
  } catch (error) { next(error); }
};

exports.downloadApp = async (req, res, next) => {
  try {
    const result = await appService.downloadApp(req.params.id, req.user._id);
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
};

exports.announceUpdate = async (req, res, next) => {
  try {
    const result = await appService.announceUpdate(req.params.id, req.user._id, req.body.message);
    res.json({ success: true, ...result });
  } catch (error) { next(error); }
};
