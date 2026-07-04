import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import api from '../services/api';
// Retain mocks as fallback for stories, as requested: "Manter stories com mock apenas se necessário, mas deixar isso claro"
import { mockStories as initialStories } from '../mocks/feedMocks';

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState(initialStories);
  const [discussions, setDiscussions] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [loadingStories, setLoadingStories] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await api.get('/posts');
      setPosts(res.data || []);
    } catch (error) {
      console.warn('Failed to fetch posts', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchDiscussions = async () => {
    try {
      setLoadingDiscussions(true);
      const res = await api.get('/discussions');
      setDiscussions(res.data || []);
    } catch (error) {
      console.warn('Failed to fetch discussions', error);
    } finally {
      setLoadingDiscussions(false);
    }
  };

  const fetchStories = async () => {
    try {
      setLoadingStories(true);
      const res = await api.get('/stories');
      // Only set backend stories if they exist, else keep mock or empty array
      if (res.data && res.data.length > 0) {
        setStories(res.data);
      }
    } catch (error) {
      console.warn('Failed to fetch stories', error);
    } finally {
      setLoadingStories(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchDiscussions();
    fetchStories();

    const sub = DeviceEventEmitter.addListener('profileUpdated', () => {
      fetchPosts();
      fetchDiscussions();
      fetchStories();
    });

    return () => sub.remove();
  }, []);

  const addPost = async (newPost) => {
    try {
      await api.post('/posts', newPost);
      await fetchPosts();
    } catch (error) {
      console.warn('Failed to add post', error);
      throw error;
    }
  };
  
  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      await fetchPosts();
    } catch (error) {
      console.warn('Failed to delete post', error);
      throw error;
    }
  };

  const addComment = async (postId, text) => {
    try {
      await api.post(`/posts/${postId}/comments`, { text });
      await fetchPosts();
    } catch (error) {
      console.warn('Failed to add comment', error);
      throw error;
    }
  };

  const addDiscussion = async (newDiscussion) => {
    try {
      await api.post('/discussions', newDiscussion);
      await fetchDiscussions();
    } catch (error) {
      console.warn('Failed to add discussion', error);
      throw error;
    }
  };

  const deleteDiscussion = async (id) => {
    try {
      await api.delete(`/discussions/${id}`);
      await fetchDiscussions();
    } catch (error) {
      console.warn('Failed to delete discussion', error);
      throw error;
    }
  };

  const addStory = async (newStory) => {
    try {
      // O backend agora cuida da lógica de concatenar images se o usuário já tiver um story ativo
      await api.post('/stories', {
        user: newStory.user,
        avatar: newStory.avatar,
        storyImages: newStory.storyImages
      });
      await fetchStories();
    } catch (error) {
      console.warn('Failed to add story', error);
      throw error;
    }
  };

  return (
    <FeedContext.Provider value={{ 
      posts, loadingPosts, fetchPosts, addPost, deletePost, addComment,
      stories, loadingStories, fetchStories, addStory, 
      discussions, loadingDiscussions, fetchDiscussions, addDiscussion, deleteDiscussion
    }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
