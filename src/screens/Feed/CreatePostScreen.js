import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity,
  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Alert, Dimensions, DeviceEventEmitter
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';

const MAX_CHARS = 300;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CreatePostScreen({ navigation, route }) {
  const { addPost } = useFeed();
  const { profile, pets } = usePet();
  const [content, setContent] = useState('');
  const [mediaList, setMediaList] = useState([]); // [{ uri, type: 'image'|'video', width, height }]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // Listen for cropped image coming back via DeviceEventEmitter
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('onCropDone', (cropped) => {
      setMediaList(prev => {
        // Avoid duplicate additions
        if (prev.some(m => m.uri === cropped.uri)) return prev;
        return [...prev, {
          uri: cropped.uri,
          type: 'image',
          width: cropped.width,
          height: cropped.height,
        }];
      });
    });

    return () => sub.remove();
  }, []);

  const charsLeft = MAX_CHARS - content.length;
  const isOverLimit = charsLeft < 0;
  const canPost = (content.trim().length > 0 || mediaList.length > 0) && !isOverLimit && !isSubmitting;

  const handlePost = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    
    const petName = pets && pets.length > 0 ? pets[0].name : null;
    const authorName = petName ? `${profile.name || 'Você'} & ${petName}` : (profile.name || 'Você');

    const newPost = {
      id: 'user_' + Date.now().toString(),
      user: authorName,
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      time: 'agora',
      content: content.trim(),
      image: mediaList.length > 0 ? mediaList[0].uri : null,
      likes: 0,
      comments: 0,
    };
    addPost(newPost);
    navigation.goBack();
  };

  const pickImage = async () => {
    if (mediaList.length >= 4) {
      Alert.alert('Limite', 'Você pode adicionar até 4 mídias por post.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        // Navigate to crop editor
        navigation.navigate('ImageCrop', {
          imageUri: asset.uri,
          imageWidth: asset.width,
          imageHeight: asset.height,
          currentContent: content,
        });
      }
    } catch (e) {
      console.log('Image picker error:', e);
    }
  };

  const pickVideo = async () => {
    if (mediaList.length >= 4) {
      Alert.alert('Limite', 'Você pode adicionar até 4 mídias por post.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar vídeos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 0.8,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setMediaList(prev => [...prev, {
          uri: asset.uri,
          type: 'video',
          width: asset.width,
          height: asset.height,
        }]);
      }
    } catch (e) {
      console.log('Video picker error:', e);
    }
  };

  const takePhoto = async () => {
    if (mediaList.length >= 4) {
      Alert.alert('Limite', 'Você pode adicionar até 4 mídias por post.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        // Navigate to crop editor
        navigation.navigate('ImageCrop', {
          imageUri: asset.uri,
          imageWidth: asset.width,
          imageHeight: asset.height,
          currentContent: content,
        });
      }
    } catch (e) {
      console.log('Camera error:', e);
    }
  };

  const removeMedia = (index) => {
    setMediaList(prev => prev.filter((_, i) => i !== index));
  };

  const getCharCountColor = () => {
    if (charsLeft < 0) return colors.error;
    if (charsLeft <= 20) return '#FF9500';
    return colors.textLight;
  };

  // Compute aspect-aware height for a single image preview
  const getMediaHeight = (media) => {
    if (media.width && media.height) {
      const ratio = media.height / media.width;
      const calculatedHeight = Math.min((SCREEN_WIDTH - 32) * ratio, 500); // 32 is horizontal padding
      return Math.max(calculatedHeight, 100);
    }
    return 250; // square-ish default
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={26} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePost}
            disabled={!canPost}
            style={[styles.publishBtn, !canPost && styles.publishBtnDisabled]}
          >
            <Text style={[styles.publishText, !canPost && styles.publishTextDisabled]}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Compose area */}
        <ScrollView style={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.composeRow}>
            <Image
              source={{ uri: profile.avatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.composeContent}>
              <TextInput
                style={styles.input}
                placeholder="No que seu pet está pensando?"
                placeholderTextColor={colors.textLight}
                multiline
                value={content}
                onChangeText={setContent}
                autoFocus
                maxLength={MAX_CHARS}
              />
            </View>
          </View>

          {/* Media preview grid */}
          {mediaList.length > 0 && (
            <View style={styles.mediaGrid}>
              {mediaList.map((media, index) => (
                <View key={index} style={[
                  styles.mediaItem,
                  mediaList.length === 1 && { width: '100%', height: getMediaHeight(media) },
                  mediaList.length === 2 && styles.mediaItemHalf,
                  mediaList.length >= 3 && styles.mediaItemThird,
                ]}>
                  <Image
                    source={{ uri: media.uri }}
                    style={styles.mediaImage}
                    resizeMode="cover"
                  />
                  {media.type === 'video' && (
                    <View style={styles.videoOverlay}>
                      <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.removeMediaBtn}
                    onPress={() => removeMedia(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom toolbar */}
        <View style={styles.bottomBar}>
          <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolBtn} onPress={pickImage}>
              <Ionicons name="image-outline" size={23} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolBtn} onPress={pickVideo}>
              <Ionicons name="videocam-outline" size={23} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolBtn} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={23} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolBtn}>
              <Ionicons name="happy-outline" size={23} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolBtn}>
              <Ionicons name="location-outline" size={23} color={colors.secondary} />
            </TouchableOpacity>
          </View>

          {/* Character counter */}
          <View style={styles.charCountArea}>
            {content.length > 0 && (
              <>
                <View style={[styles.progressRing, isOverLimit && { borderColor: colors.error }]}>
                  <View style={styles.progressRingInner}>
                    {charsLeft <= 20 && (
                      <Text style={[styles.charCountInner, { color: getCharCountColor() }]}>
                        {charsLeft}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.charDivider} />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  closeBtn: {
    padding: 4,
  },
  publishBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishBtnDisabled: {
    backgroundColor: colors.border,
  },
  publishText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  publishTextDisabled: {
    color: colors.textLight,
  },
  scrollContent: {
    flex: 1,
  },
  composeRow: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    marginTop: 2,
  },
  composeContent: {
    flex: 1,
  },
  input: {
    fontSize: 18,
    color: colors.text,
    textAlignVertical: 'top',
    minHeight: 120,
    lineHeight: 26,
    paddingTop: 0,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 16,
  },
  mediaItem: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaItemHalf: {
    width: '48.5%',
    height: 200,
  },
  mediaItemThird: {
    width: '48.5%',
    height: 150,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  removeMediaBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolBtn: {
    marginRight: 20,
    padding: 4,
  },
  charCountArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressRing: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  charCountInner: {
    fontSize: 10,
    fontWeight: '700',
  },
  charDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
    marginLeft: 12,
  },
});
