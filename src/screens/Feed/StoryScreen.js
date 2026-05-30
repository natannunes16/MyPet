import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFeed } from '../../context/FeedContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function StoryScreen({ route, navigation }) {
  const { stories } = useFeed();
  const { storyIndex = 0 } = route.params || {};
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(storyIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const flatListRef = useRef(null);

  const currentAnimal = stories[currentAnimalIndex];
  const currentImages = currentAnimal?.storyImages || [];
  const STORY_DURATION = 5000; // 5 seconds per story image

  const startProgress = useCallback(() => {
    progressAnim.setValue(0);
    if (timerRef.current) {
      timerRef.current.stop();
    }
    const anim = Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    timerRef.current = anim;
    anim.start(({ finished }) => {
      if (finished) {
        goToNextImage();
      }
    });
  }, [currentAnimalIndex, currentImageIndex]);

  useEffect(() => {
    startProgress();
    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
      }
    };
  }, [currentAnimalIndex, currentImageIndex, startProgress]);

  const goToNextImage = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      goToNextAnimal();
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      goToPrevAnimal();
    }
  };

  const goToNextAnimal = () => {
    if (currentAnimalIndex < stories.length - 1) {
      const nextIndex = currentAnimalIndex + 1;
      setCurrentAnimalIndex(nextIndex);
      setCurrentImageIndex(0);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      navigation.goBack();
    }
  };

  const goToPrevAnimal = () => {
    if (currentAnimalIndex > 0) {
      const prevIndex = currentAnimalIndex - 1;
      setCurrentAnimalIndex(prevIndex);
      
      // Ao voltar de usuário, deve mostrar a última imagem dele (como no Instagram)
      const prevAnimal = stories[prevIndex];
      const lastImageIndex = prevAnimal?.storyImages ? prevAnimal.storyImages.length - 1 : 0;
      setCurrentImageIndex(lastImageIndex);
      
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    } else {
      // Se for a primeira imagem do primeiro usuário, apenas reinicia
      progressAnim.setValue(0);
      startProgress();
    }
  };

  // Removido handleTap usando locationX, substituído por zonas de toque transparentes

  const onCarouselItemPress = (index) => {
    if (index !== currentAnimalIndex) {
      setCurrentAnimalIndex(index);
      setCurrentImageIndex(0);
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const renderCarouselItem = ({ item, index }) => {
    const isActive = index === currentAnimalIndex;
    return (
      <TouchableOpacity
        onPress={() => onCarouselItemPress(index)}
        style={[styles.carouselItem, isActive && styles.carouselItemActive]}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.avatar }} style={styles.carouselAvatar} />
        <Text style={[styles.carouselName, isActive && styles.carouselNameActive]} numberOfLines={1}>
          {item.user}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!currentAnimal) {
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Story Image */}
      <View style={styles.storyImageContainer}>
        <Image
          source={{ uri: currentImages[currentImageIndex] }}
          style={styles.storyImage}
          resizeMode="cover"
        />

        {/* Tap areas for navigation */}
        <View style={[StyleSheet.absoluteFill, { flexDirection: 'row', zIndex: 5 }]}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={goToPrevImage} 
          />
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={goToNextImage} 
          />
        </View>

        {/* Gradient overlay top */}
        <View style={styles.gradientTop} />
        {/* Gradient overlay bottom */}
        <View style={styles.gradientBottom} />

        {/* Progress bars */}
        <SafeAreaView style={styles.progressContainer}>
          <View style={styles.progressBarRow}>
            {currentImages.map((_, i) => (
              <View key={i} style={styles.progressBarBg}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width:
                        i < currentImageIndex
                          ? '100%'
                          : i === currentImageIndex
                          ? progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            })
                          : '0%',
                    },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Header with avatar and close */}
          <View style={styles.storyHeader}>
            <View style={styles.storyHeaderLeft}>
              <Image source={{ uri: currentAnimal.avatar }} style={styles.headerAvatar} />
              <Text style={styles.headerName}>{currentAnimal.user}</Text>
              <Text style={styles.headerTime}>agora</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderCarouselItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselList}
          initialScrollIndex={storyIndex > 2 ? storyIndex - 2 : 0}
          getItemLayout={(data, index) => ({
            length: 76,
            offset: 76 * index,
            index,
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImageContainer: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: 'transparent',
    // Simulating gradient with shadow
    ...Platform.select({
      web: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
      },
      default: {},
    }),
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
      },
      default: {},
    }),
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  progressBarRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'web' ? 16 : 8,
    gap: 4,
  },
  progressBarBg: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  storyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  headerName: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  carouselContainer: {
    backgroundColor: '#000',
    paddingVertical: 12,
  },
  carouselList: {
    paddingHorizontal: 12,
  },
  carouselItem: {
    alignItems: 'center',
    marginRight: 12,
    width: 64,
    opacity: 0.5,
  },
  carouselItemActive: {
    opacity: 1,
  },
  carouselAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  carouselName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  carouselNameActive: {
    color: '#FFF',
    fontWeight: '700',
  },
});
