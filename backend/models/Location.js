const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  petId: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petName: { type: String },
  petPhoto: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  address: { type: String },
  status: { type: String, enum: ['active', 'lost', 'found', 'inactive'], default: 'active' },
  isLost: { type: Boolean, default: false },
  sharedUntil: { type: Date },
  lastSeenAt: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
