const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trackerStatus: {
    type: String,
    enum: ['conectado', 'desconectado', 'sem rastreador'],
    default: 'sem rastreador',
  },
  lastLocation: {
    latitude: Number,
    longitude: Number,
    address: String,
    updatedAt: Date,
  },
  health: {
    weight: String,
    lastVaccine: String,
    allergies: String,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pet', petSchema);
