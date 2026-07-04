const MarketplaceItem = require('../models/MarketplaceItem');

const getItems = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type) {
      query.type = type;
    }
    const items = await MarketplaceItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description, type, tag, tagColor, price, location, image, species, breed, age } = req.body;
    
    const item = new MarketplaceItem({
      name,
      description,
      type,
      tag,
      tagColor,
      price,
      location,
      image,
      species,
      breed,
      age,
      ownerId: req.user.id,
      ownerName: req.user.name || 'Usuário',
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await MarketplaceItem.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Anúncio não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
  getItemById,
};
