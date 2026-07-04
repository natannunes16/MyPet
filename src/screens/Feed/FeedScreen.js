import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal,
  Dimensions, ActivityIndicator, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';
import * as ImagePicker from 'expo-image-picker';
import MainHeader from '../../components/Header/MainHeader';

const CARD_PADDING = 16;
const SCREEN_PADDING = 16;
const CARD_WIDTH = Dimensions.get('window').width - (SCREEN_PADDING * 2) - (CARD_PADDING * 2);

// Component that auto-sizes image height based on actual aspect ratio
function AdaptiveImage({ uri }) {
  const [imgHeight, setImgHeight] = useState(200);

  useEffect(() => {
    if (uri) {
      Image.getSize(
        uri,
        (w, h) => {
          if (w > 0) {
            const ratio = h / w;
            // Clamp max height to avoid extremely tall images
            const calculatedHeight = Math.min(CARD_WIDTH * ratio, 500);
            setImgHeight(Math.max(calculatedHeight, 100));
          }
        },
        () => { setImgHeight(200); }
      );
    }
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={[styles.postImage, { height: imgHeight }]}
      resizeMode="cover"
    />
  );
}

export default function FeedScreen({ navigation }) {
  const { posts, stories, loadingPosts, fetchPosts, deletePost, addComment } = useFeed();
  const { profile } = usePet();

  // State for likes: { postId: true/false }
  const [likedPosts, setLikedPosts] = useState({});
  // State for like counts: { postId: number } — lazily fill for new posts
  const [likeCounts, setLikeCounts] = useState({});
  // State for comments: { postId: [{ id, text, user, time }] }
  const [comments, setComments] = useState({});
  // State for comment counts
  const [commentCounts, setCommentCounts] = useState({});
  // Modal state for comments
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Helper to get like count for a post (fallback to post.likes)
  const getLikeCount = (post) => {
    const id = post._id || post.id;
    return likeCounts[id] !== undefined ? likeCounts[id] : (post.likes || 0);
  };
  const getCommentCount = (post) => {
    return post.commentsList?.length || post.comments || 0;
  };

  const toggleLike = (postId) => {
    const wasLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !wasLiked }));
    setLikeCounts(prev => {
      const post = posts.find(p => (p._id || p.id) === postId);
      const baseLikes = post ? (post.likes || 0) : 0;
      const current = prev[postId] !== undefined ? prev[postId] : baseLikes;
      return { ...prev, [postId]: current + (wasLiked ? -1 : 1) };
    });
  };

  const openComments = (postId) => {
    setActivePostId(postId);
    setCommentModalVisible(true);
  };

  const sendComment = async () => {
    if (!commentText.trim() || !activePostId) return;
    try {
      await addComment(activePostId, commentText.trim());
      setCommentText('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
    }
  };

  const confirmDeletePost = (postId) => {
    Alert.alert('Excluir Publicação', 'Tem certeza que deseja excluir esta publicação?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deletePost(postId) }
    ]);
  };

  const renderStory = ({ item, index }) => (
    <TouchableOpacity
      style={styles.storyContainer}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Story', { storyIndex: index })}
    >
      <View style={styles.storyBorder}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUser} numberOfLines={1}>{item.user}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => {
    const postId = item._id || item.id;
    const isLiked = likedPosts[postId];
    
    // Check if the current user is the author of this post
    const currentUserId = profile?._id || profile?.id;
    const isMyPost = item.authorId === currentUserId || item.author === currentUserId || item.userId === currentUserId;

    // Fix backend mapping and reactively use updated profile
    const userAvatar = isMyPost && profile?.avatar ? profile.avatar : (item.authorAvatar || item.avatar || item.author?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80');
    
    let userName = item.authorName || item.user || item.author?.name || 'Usuário';
    if (isMyPost && profile?.name) {
      userName = item.petName ? `${profile.name} & ${item.petName}` : profile.name;
    }

    return (
      <View style={styles.card}>
        <View style={[styles.postHeader, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
            <View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.timeText}>{item.time || 'recentemente'}</Text>
            </View>
          </View>
          {isMyPost && (
            <TouchableOpacity onPress={() => confirmDeletePost(postId)} style={{ padding: 5 }}>
              <Ionicons name="trash-outline" size={20} color={colors.error || '#D32F2F'} />
            </TouchableOpacity>
          )}
        </View>

        {item.content || item.caption ? <Text style={styles.content}>{item.content || item.caption}</Text> : null}

        {item.image && (
          <AdaptiveImage uri={item.image} />
        )}

        <View style={styles.postFooter}>
          <TouchableOpacity style={styles.action} onPress={() => toggleLike(postId)}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={isLiked ? '#FF3B30' : colors.textLight}
            />
            <Text style={[styles.actionText, isLiked && styles.actionTextLiked]}>
              {getLikeCount(item)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => openComments(postId)}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.textLight} />
            <Text style={styles.actionText}>{getCommentCount(item)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Ionicons name="share-social-outline" size={22} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAddStory = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Precisamos da permissão para acessar a galeria!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        navigation.navigate('CreateStory', { imageUri: result.assets[0].uri });
      }
    } catch (error) {
      console.log('Error picking story image:', error);
    }
  };

  const renderAddStory = () => (
    <TouchableOpacity
      style={styles.storyContainer}
      activeOpacity={0.7}
      onPress={handleAddStory}
    >
      <View style={styles.storyBorder}>
        <View style={styles.addStoryCircle}>
          <Ionicons name="add" size={32} color="#FFF" />
        </View>
      </View>
      <Text style={styles.storyUser} numberOfLines={1}>Seu Story</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        keyExtractor={item => item._id || item.id || Math.random().toString()}
        renderItem={renderStory}
        ListHeaderComponent={renderAddStory}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );

  const activePostComments = activePostId ? (posts.find(p => (p._id || p.id) === activePostId)?.commentsList || []) : [];

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader subtitle="feed" navigation={navigation} />

      {loadingPosts ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 10, color: colors.textLight }}>Carregando publicações...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item._id || item.id || Math.random().toString()}
          renderItem={renderPost}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="images-outline" size={48} color={colors.border} />
              <Text style={styles.emptyText}>Nenhuma publicação encontrada.</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchPosts}
          refreshing={loadingPosts}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost')}>
        <Ionicons name="create-outline" size={26} color="#FFF" />
      </TouchableOpacity>

      {/* Comments Modal */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContainer}
          >
            {/* Handle bar */}
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comentários</Text>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Comments list */}
            <FlatList
              data={activePostComments}
              keyExtractor={item => item._id || Math.random().toString()}
              style={styles.commentsList}
              ListEmptyComponent={
                <View style={styles.emptyComments}>
                  <Ionicons name="chatbubble-ellipses-outline" size={48} color={colors.border} />
                  <Text style={styles.emptyText}>Nenhum comentário ainda</Text>
                  <Text style={styles.emptySubtext}>Seja o primeiro a comentar!</Text>
                </View>
              }
              renderItem={({ item: comment }) => (
                <View style={styles.commentItem}>
                  <View style={styles.commentAvatarPlaceholder}>
                    {comment.avatar ? (
                      <Image source={{ uri: comment.avatar }} style={{ width: '100%', height: '100%', borderRadius: 18 }} />
                    ) : (
                      <Ionicons name="person" size={18} color={colors.textLight} />
                    )}
                  </View>
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>{comment.user || 'Usuário'}</Text>
                      <Text style={styles.commentTime}>
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'agora'}
                      </Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              )}
            />

            {/* Comment input */}
            <View style={styles.commentInputRow}>
              <TextInput
                style={styles.commentInput}
                placeholder="Escreva um comentário..."
                placeholderTextColor={colors.textLight}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
                onPress={sendComment}
                disabled={!commentText.trim()}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={commentText.trim() ? colors.primary : colors.border}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerContainer: {
    marginBottom: 16,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSpacer: { 
    width: 32, // to balance the bell icon (24 + 8 padding)
  },
  bellBtn: { padding: 4 },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  navSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  storiesList: {
    paddingVertical: 5,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  storyBorder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyBorderViewed: {
    borderColor: colors.border,
  },
  addStoryCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  storyUser: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.border,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    color: colors.textLight,
  },
  content: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    paddingTop: 12,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  actionText: {
    marginLeft: 6,
    color: colors.textLight,
    fontWeight: '500',
  },
  actionTextLiked: {
    color: '#FF3B30',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%',
    minHeight: 300,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyComments: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  commentAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  commentTime: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    maxHeight: 80,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
