import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  { 
    id: 1, 
    title: 'Tudo sobre seu pet em um só lugar', 
    desc: 'Compartilhe momentos, tire dúvidas, encontre produtos e proteja seu animal.', 
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    type: 'image'
  },
  { 
    id: 2, 
    title: 'Conecte-se com outros tutores', 
    desc: 'Publique fotos, stories e participe de discussões com quem também ama pets.', 
    type: 'nodes'
  },
  { 
    id: 3, 
    title: 'Mais segurança para seu pet', 
    desc: 'No futuro, acompanhe a localização do seu animal com uma coleira rastreadora.', 
    type: 'map'
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Register');
    }
  };

  const handleSkip = () => {
    navigation.replace('Register');
  };

  const renderGraphic = (type, image) => {
    if (type === 'image') {
      return (
        <View style={styles.graphicContainer}>
          <Image source={{ uri: image }} style={styles.mainImage} />
        </View>
      );
    }
    
    if (type === 'nodes') {
      return (
        <View style={styles.graphicContainer}>
          {/* Node Graphic Mockup */}
          <View style={styles.nodesWrapper}>
            {/* Center Node */}
            <View style={styles.centerNode}>
              <Ionicons name="paw" size={40} color="#1E1E1E" />
            </View>
            
            {/* Connecting lines */}
            <View style={[styles.line, { top: '35%', left: '35%', transform: [{ rotate: '-45deg' }] }]} />
            <View style={[styles.line, { top: '35%', right: '35%', transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.line, { bottom: '35%', left: '35%', transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.line, { bottom: '35%', right: '35%', transform: [{ rotate: '-45deg' }] }]} />
            
            {/* Outer Nodes */}
            <View style={[styles.outerNode, { top: '10%', left: '10%' }]}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1537151608804-ea2f1ea3b306?w=100' }} style={styles.nodeImage} />
            </View>
            <View style={[styles.outerNode, { top: '10%', right: '10%' }]}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100' }} style={styles.nodeImage} />
            </View>
            <View style={[styles.outerNode, { bottom: '10%', left: '10%' }]}>
              <Ionicons name="chatbubbles" size={24} color="#1976D2" />
            </View>
            <View style={[styles.outerNode, { bottom: '10%', right: '10%' }]}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=100' }} style={styles.nodeImage} />
            </View>
          </View>
        </View>
      );
    }
    
    if (type === 'map') {
      return (
        <View style={styles.graphicContainer}>
          <View style={styles.mapCard}>
            <Image 
              source={require('../../assets/isometric_map.png')} 
              style={styles.mapBackground} 
            />
            <View style={styles.mapOverlay}>
              <View style={styles.locationPin}>
                <Ionicons name="location" size={24} color="#1E1E1E" />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>Localização Atual</Text>
                <Text style={styles.locationSub}>Atualizado há 2 min</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const isLast = currentIndex === slides.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slide}>
        {renderGraphic(slides[currentIndex].type, slides[currentIndex].image)}
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentIndex].title}</Text>
          <Text style={styles.desc}>{slides[currentIndex].desc}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.dotActive]} />
          ))}
        </View>

        {isLast ? (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.btnComecar} onPress={handleNext}>
              <Text style={styles.btnComecarText}>Começar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPular} onPress={handleSkip}>
              <Text style={styles.btnPularText}>Pular</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.btnProximo} onPress={handleNext}>
            <Text style={styles.btnProximoText}>Próximo</Text>
            <Ionicons name="arrow-forward" size={20} color="#1E1E1E" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  graphicContainer: {
    height: width * 0.8,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  /* Graphic 1: Image */
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  /* Graphic 2: Nodes */
  nodesWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNode: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  outerNode: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EBF4FF',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 5,
  },
  nodeImage: {
    width: '100%',
    height: '100%',
  },
  line: {
    position: 'absolute',
    width: 60,
    height: 2,
    backgroundColor: '#B0BEC5',
    zIndex: 1,
  },
  /* Graphic 3: Map */
  mapCard: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  mapBackground: {
    width: '100%',
    height: '70%',
    opacity: 0.8,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  locationPin: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  locationSub: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E1E1E',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  desc: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#FFD500',
    width: 24,
  },
  btnProximo: {
    backgroundColor: '#FFD500',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  btnProximoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginRight: 8,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btnComecar: {
    backgroundColor: '#FFD500',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  btnComecarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  btnPular: {
    paddingVertical: 10,
  },
  btnPularText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  }
});
