import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, 
  TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { mockDiscussions } from '../../mocks/discussionsMocks';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';
import { Ionicons } from '@expo/vector-icons';

const AnimatedLikeButton = ({ initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikes(prev => nextLiked ? prev + 1 : prev - 1);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  };

  return (
    <TouchableOpacity style={styles.commentActionBtn} onPress={handleLike} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name={isLiked ? "thumbs-up" : "thumbs-up-outline"} size={14} color={isLiked ? colors.primary : colors.textLight} />
      </Animated.View>
      <Text style={[styles.commentActionText, isLiked && { color: colors.primary }]}>Útil ({likes})</Text>
    </TouchableOpacity>
  );
};

export default function DiscussionDetailScreen({ route, navigation }) {
  const { discussionId } = route.params;
  const { discussions } = useFeed();
  const initialDiscussion = discussions.find(d => (d._id || d.id) === discussionId);
  
  const [discussion, setDiscussion] = useState(initialDiscussion);
  const [comments, setComments] = useState(() => {
    if (Array.isArray(initialDiscussion?.comments)) return initialDiscussion.comments;
    if (Array.isArray(initialDiscussion?.commentsList)) return initialDiscussion.commentsList;
    return [];
  });
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // { commentId, authorName }
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialDiscussion?.likes || 0);
  const { profile } = usePet();
  const inputRef = useRef(null);

  if (!discussion) return null;

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      author: profile.name || 'Você',
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      content: inputText.trim(),
      time: 'agora',
      likes: 0,
      replies: []
    };

    if (replyingTo) {
      // Find root comment
      setComments(prev => prev.map(c => {
        if (c.id === replyingTo.commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newComment]
          };
        }
        return c;
      }));
    } else {
      setComments(prev => [...(Array.isArray(prev) ? prev : []), newComment]);
    }

    setInputText('');
    setReplyingTo(null);
    Keyboard.dismiss();
  };

  const handleReplyPress = (commentId, authorName) => {
    setReplyingTo({ commentId, authorName });
    inputRef.current?.focus();
  };

  const isMyDiscussion = discussion.authorId === (profile?._id || profile?.id);
  const displayAuthor = isMyDiscussion && profile?.name ? profile.name : discussion.author;
  const displayAvatar = isMyDiscussion && profile?.avatar ? profile.avatar : (discussion.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80');

  const renderPost = () => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: displayAvatar }} style={styles.postAvatar} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{displayAuthor}</Text>
          <View style={styles.postMetaRow}>
            <Text style={styles.postTime}>{discussion.time}</Text>
            {discussion.category && (
              <>
                <Text style={styles.dot}> • </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{discussion.category}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.postTitle}>{discussion.title}</Text>
      <Text style={styles.postContent}>{discussion.content}</Text>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => {
            setIsLiked(!isLiked);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
          }}
        >
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#FF3B30" : colors.textLight} />
          <Text style={[styles.actionText, isLiked && { color: "#FF3B30" }]}>Apoiar ({likeCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={20} color={colors.textLight} />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.commentsTitle}>Comentários ({comments.length})</Text>
    </View>
  );

  const renderReply = (reply) => (
    <View key={reply.id} style={styles.replyItem}>
      <Image source={{ uri: reply.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentBody}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{reply.author}</Text>
          <Text style={styles.commentTime}>{reply.time}</Text>
          <Ionicons name="ellipsis-horizontal" size={16} color={colors.textLight} style={styles.commentMenu} />
        </View>
        <Text style={styles.commentContent}>{reply.content}</Text>
        <View style={styles.commentActions}>
          <AnimatedLikeButton initialLikes={reply.likes} />
          {/* Pode adicionar responder à tréplica se quiser, mas por simplicidade, responde ao comentário raiz */}
        </View>
      </View>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentItem}>
        <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
        <View style={styles.commentBody}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentTime}>{item.time}</Text>
            <Ionicons name="ellipsis-horizontal" size={16} color={colors.textLight} style={styles.commentMenu} />
          </View>
          <Text style={styles.commentContent}>{item.content}</Text>
          <View style={styles.commentActions}>
            <AnimatedLikeButton initialLikes={item.likes} />
            <TouchableOpacity 
              style={styles.commentActionBtn}
              onPress={() => handleReplyPress(item.id, item.author)}
            >
              <Text style={styles.commentActionText}>Responder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {item.replies && item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.replies.map(renderReply)}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.navTitle}>MyPet</Text>
            <Text style={styles.navSubtitle}>feed</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={Array.isArray(comments) ? comments : []}
          keyExtractor={(item, index) => (item && item.id) ? item.id.toString() : index.toString()}
          ListHeaderComponent={renderPost}
          renderItem={renderComment}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Input Area */}
        <View style={styles.inputContainer}>
          {replyingTo && (
            <View style={styles.replyingIndicator}>
              <Text style={styles.replyingText}>Respondendo a {replyingTo.author}...</Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Ionicons name="close-circle" size={18} color={colors.textLight} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Escreva uma resposta..."
              placeholderTextColor={colors.textLight}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? colors.primary : colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC', // fundo claro do app
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
  backBtn: { padding: 4 },
  bellBtn: { padding: 4 },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  listContent: {
    padding: 16,
  },
  postContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  postMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  postTime: {
    fontSize: 13,
    color: colors.textLight,
  },
  dot: {
    color: colors.textLight,
    marginHorizontal: 4,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 6,
    fontWeight: '500',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 4,
  },
  commentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentItem: {
    flexDirection: 'row',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentBody: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  commentTime: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  commentMenu: {
    marginLeft: 'auto',
  },
  commentContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  commentActionText: {
    fontSize: 13,
    color: colors.textLight,
    marginLeft: 4,
  },
  repliesContainer: {
    marginTop: 16,
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: colors.surface,
  },
  replyItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  replyingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  replyingText: {
    fontSize: 12,
    color: colors.textLight,
    marginRight: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  sendBtn: {
    padding: 8,
    marginLeft: 4,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});
