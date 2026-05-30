import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header/Header';
import { usePet } from '../../context/PetContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MeusPetsScreen({ navigation }) {
  const { pets, deletePet } = usePet();

  const confirmDelete = (index) => {
    Alert.alert('Confirmar exclusão', 'Deseja remover este pet?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deletePet(index) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('DetalheDoPet', { petId: index })}>
        <Text style={styles.title}>{item.name || 'Sem nome'}</Text>
        <Text style={styles.subtitle}>Raça: {item.breed || '-'} | Idade: {item.age || '-'}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPet', { petIndex: index, petData: item })}>
          <Icon name="edit" size={20} color={colors.textLight} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(index)} style={{ marginLeft: 12 }}>
          <Icon name="delete" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Meus Pets" />
      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum pet cadastrado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16 },
  card: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textLight, marginTop: 4 },
  actions: { flexDirection: 'row', marginLeft: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: colors.textLight },
});
