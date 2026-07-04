const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { caption, image, petId, petName } = req.body;
    
    let finalAuthorName = req.user.name || 'Usuário';
    if (petName) {
      finalAuthorName = `${finalAuthorName} & ${petName}`;
    }
    
    const post = new Post({
      authorId: req.user.id,
      authorName: finalAuthorName,
      authorAvatar: req.user.avatar,
      petId,
      petName,
      image,
      caption,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.authorId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      await post.deleteOne();
      res.json({ message: 'Post removido' });
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const newComment = {
      user: req.user.name || 'Usuário',
      avatar: req.user.avatar,
      text: req.body.text,
    };

    post.commentsList.push(newComment);
    post.comments = post.commentsList.length; // update counter
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  commentOnPost,
};
