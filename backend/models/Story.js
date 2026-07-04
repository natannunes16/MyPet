const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: String, required: true },
  avatar: { type: String, required: true },
  storyImages: [{ type: String, required: true }],
  isViewed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL index: 86400 seconds = 24 hours
});

module.exports = mongoose.model('Story', storySchema);
