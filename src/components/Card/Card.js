import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Card({ avatar, userName, time, content, image, likes, comments, onPressHeart, onPressComment, onPressShare }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>

      {/* Image */}
      {image && <Image source={{ uri: image }} style={styles.postImage} />}

      {/* Footer actions */}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.action} onPress={onPressHeart}>
          <Ionicons name="heart-outline" size={22} color={colors.textLight} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onPressComment}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.textLight} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onPressShare}>
          <Ionicons name="share-social-outline" size={22} color={colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 250,
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
});
