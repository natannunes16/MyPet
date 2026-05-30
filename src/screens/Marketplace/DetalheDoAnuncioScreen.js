import React from 'react';
import { Share, Button, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { mockProducts, mockAnimals } from '../../mocks/marketplaceMocks';

export default function DetalheDoAnuncioScreen({ route }) {
  const { itemId } = route.params || {};

  const product = mockProducts.find(p => p.id === itemId);
  const animal = mockAnimals.find(a => a.id === itemId);
  const item = product || animal;

  const mockAd = item || {
    title: 'Título do Anúncio',
    description: 'Descrição detalhada do produto ou animal.',
    image: 'https://via.placeholder.com/300',
    price: 'R$ 0,00',
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${mockAd.title}\n${mockAd.description}\n${mockAd.image}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mockAd.title}</Text>
      <Image source={{ uri: mockAd.image }} style={styles.image} />
      {mockAd.price && <Text style={styles.price}>{mockAd.price}</Text>}
      <Text style={styles.description}>{mockAd.description}</Text>
      <Button title="Compartilhar" onPress={onShare} color={colors.primary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});
