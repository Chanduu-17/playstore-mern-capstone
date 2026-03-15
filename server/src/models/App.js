const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['games', 'beauty', 'fashion', 'women', 'health', 'social media'] },
  genre: { type: String, required: true },
  version: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now },
  ratingAverage: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  features: [{ type: String }],
  imageUrl: { type: String, default: 'https://static0.anpoimages.com/wordpress/wp-content/uploads/2015/03/nexus2cee_an.png' },
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('App', appSchema);
