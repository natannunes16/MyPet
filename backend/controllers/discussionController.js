const Discussion = require('../models/Discussion');

const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDiscussion = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const discussion = new Discussion({
      title,
      content,
      category,
      authorId: req.user.id,
      author: req.user.name || 'Usuário',
      avatar: req.user.avatar,
    });

    const createdDiscussion = await discussion.save();
    res.status(201).json(createdDiscussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (discussion) {
      res.json(discussion);
    } else {
      res.status(404).json({ message: 'Discussão não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (discussion) {
      if (discussion.authorId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      await discussion.deleteOne();
      res.json({ message: 'Discussão removida com sucesso' });
    } else {
      res.status(404).json({ message: 'Discussão não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDiscussions,
  createDiscussion,
  getDiscussionById,
  deleteDiscussion,
};
