const mongoose = require('mongoose');

const marketplaceItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String, // 'Produto', 'Animal', 'Serviço'
    required: true,
  },
  tag: {
    type: String, // 'ADOÇÃO', 'VENDA'
  },
  tagColor: {
    type: String,
  },
  price: {
    type: String,
  },
  isDonation: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  species: {
    type: String, // para filtro
  },
  breed: {
    type: String,
  },
  age: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MarketplaceItem', marketplaceItemSchema);
