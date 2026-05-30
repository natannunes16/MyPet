import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header/Header';
import { mockProducts } from '../../mocks/marketplaceMocks';

export default function MarketplaceProdutosScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalheDoAnuncio', { itemId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Produtos" />
      <FlatList
        data={mockProducts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    flex: 1,
    backgroundColor: colors.background,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: '100%', height: 120 },
  info: { padding: 10 },
  title: { fontSize: 14, fontWeight: '600', color: colors.text },
  price: { fontSize: 14, color: colors.secondary, marginTop: 4 },
});
