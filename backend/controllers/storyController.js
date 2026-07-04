const Story = require('../models/Story');

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar stories', error: error.message });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { user, avatar, storyImages } = req.body;
    
    // Check se usuário já tem um story ativo
    let existingStory = await Story.findOne({ user });
    
    if (existingStory) {
      existingStory.storyImages.push(...storyImages);
      // Reseta a data de expiração para mais 24h a partir do último update
      existingStory.createdAt = Date.now();
      await existingStory.save();
      return res.status(200).json(existingStory);
    } else {
      const newStory = new Story({
        user,
        avatar,
        storyImages
      });
      await newStory.save();
      return res.status(201).json(newStory);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar story', error: error.message });
  }
};
