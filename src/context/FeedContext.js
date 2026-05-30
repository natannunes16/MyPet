import React, { createContext, useContext, useState } from 'react';
import { mockPosts as initialPosts, mockStories as initialStories } from '../mocks/feedMocks';
import { mockDiscussions as initialDiscussions } from '../mocks/discussionsMocks';

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [stories, setStories] = useState(initialStories);
  const [discussions, setDiscussions] = useState(initialDiscussions);

  const addPost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const addStory = (newStory) => {
    setStories(prev => {
      // Verifica se o usuário já tem um story na lista
      const existingUserIndex = prev.findIndex(s => s.user === newStory.user);
      
      if (existingUserIndex !== -1) {
        // Se já tem, apenas adiciona a nova imagem à lista de imagens desse story
        const updatedStories = [...prev];
        const existingStory = updatedStories[existingUserIndex];
        
        updatedStories[existingUserIndex] = {
          ...existingStory,
          storyImages: [...existingStory.storyImages, ...newStory.storyImages]
        };
        
        // Move o story atualizado para o início da lista
        const [movedStory] = updatedStories.splice(existingUserIndex, 1);
        return [movedStory, ...updatedStories];
      } else {
        // Se não tem, cria um novo círculo de story
        return [newStory, ...prev];
      }
    });
  };

  const addDiscussion = (newDiscussion) => {
    setDiscussions(prev => [newDiscussion, ...prev]);
  };

  return (
    <FeedContext.Provider value={{ posts, addPost, stories, addStory, discussions, addDiscussion }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
