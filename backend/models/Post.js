const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  },
  petName: {
    type: String,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  commentsList: [{
    user: String,
    avatar: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
