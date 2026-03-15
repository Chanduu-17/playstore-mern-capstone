require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const App = require('../models/App');
const Review = require('../models/Review');

(async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), App.deleteMany(), Review.deleteMany()]);

  const ownerPassword = await bcrypt.hash('owner123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const owner = await User.create({ name: 'App Owner', email: 'owner@playstore.com', password: ownerPassword, role: 'owner' });
  const user = await User.create({ name: 'Normal User', email: 'user@playstore.com', password: userPassword, role: 'user' });

  const apps = await App.insertMany([
    {
      owner: owner._id,
      name: 'Fit Life',
      description: 'Health and fitness tracker app.',
      category: 'health',
      genre: 'Lifestyle',
      version: '1.0.0',
      features: ['Workout plans', 'Water reminders', 'BMI calculator'],
      ratingAverage: 4.5,
      ratingCount: 2,
      downloadCount: 15
    },
    {
      owner: owner._id,
      name: 'Beauty Glow',
      description: 'Beauty shopping and tips application.',
      category: 'beauty',
      genre: 'Shopping',
      version: '2.1.0',
      features: ['Skin care tips', 'Product catalog'],
      ratingAverage: 4.2,
      ratingCount: 3,
      downloadCount: 24
    },
    {
      owner: owner._id,
      name: 'Arcade World',
      description: 'Action-packed mobile gaming hub.',
      category: 'games',
      genre: 'Arcade',
      version: '3.0.2',
      features: ['Leaderboards', 'Offline mode'],
      ratingAverage: 4.8,
      ratingCount: 10,
      downloadCount: 105
    }
  ]);

  await Review.create({ app: apps[0]._id, user: user._id, rating: 5, comment: 'Very useful and clean UI' });
  console.log('Seed completed');
  await mongoose.connection.close();
})();
