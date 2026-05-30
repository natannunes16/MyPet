import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useFeed } from '../../context/FeedContext';
import { usePet } from '../../context/PetContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CreateStoryScreen({ route, navigation }) {
  const { imageUri } = route.params;
  const { addStory } = useFeed();
  const { profile } = usePet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newStory = {
      id: 'story_' + Date.now(),
      user: profile.name || 'Você',
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      storyImages: [imageUri],
      isViewed: true,
    };

    addStory(newStory);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={styles.confirmText}>Confirmar</Text>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'flex-end',
  },
  confirmButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
});
