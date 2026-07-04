import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';

export default function DetalheDoPetScreen({ route, navigation }) {
  const { deletePet } = usePet();
  const pet = route.params?.pet;

  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Pet não encontrado.</Text>
      </SafeAreaView>
    );
  }

  // Fallback para campos que ainda não estão no backend da Fase 2
  const petData = {
    ...pet,
    species: pet.species || 'Cão',
    health: {
      weight: '12 kg',
      lastVaccine: '15 Out 2023',
      allergies: 'Nenhuma'
    },
    gpsStatus: 'Desconectado',
    gpsMessage: 'Nenhum dispositivo de rastreamento ativo encontrado para este pet no momento.',
    notes: 'Bolinha é muito dócil, mas um pouco medroso com barulhos muito altos. Adora passeios matinais e tem preferência por ração úmida de frango.'
  };

  const handleRemove = () => {
    Alert.alert('Confirmar', 'Deseja realmente remover este pet?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Remover', 
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePet(pet._id);
            Alert.alert('Sucesso', 'Pet removido com sucesso!');
            navigation.goBack();
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível remover o pet.');
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MyPet</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1976D2" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar & Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: petData.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }} style={styles.avatar} />
          </View>
          <Text style={styles.petName}>{petData.name}</Text>
          
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: '#FFD500' }]}>
              <Ionicons name="paw" size={12} color="#000" style={{ marginRight: 4 }} />
              <Text style={[styles.tagText, { color: '#000', fontWeight: 'bold' }]}>{petData.species}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#E0E0E0' }]}>
              <Text style={styles.tagText}>{petData.breed}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#E0E0E0' }]}>
              <Text style={styles.tagText}>{petData.age} anos</Text>
            </View>
          </View>
        </View>

        {/* Saúde Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="pulse-outline" size={20} color="#1976D2" />
            <Text style={styles.cardTitle}>Saúde</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Peso</Text>
            <Text style={styles.rowValue}>{petData.health.weight}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Última Vacina</Text>
            <Text style={styles.rowValue}>{petData.health.lastVaccine}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Alergias</Text>
            <Text style={styles.rowValue}>{petData.health.allergies}</Text>
          </View>
        </View>

        {/* GPS Card */}
        <View style={[styles.card, { backgroundColor: '#EBF4FF' }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color="#1E1E1E" />
            <Text style={styles.cardTitle}>Rastreador GPS</Text>
            <View style={styles.badgeRed}>
              <Text style={styles.badgeRedText}>{petData.gpsStatus}</Text>
            </View>
          </View>
          <Text style={styles.gpsDesc}>{petData.gpsMessage}</Text>
          <TouchableOpacity style={styles.btnVincular}>
            <Ionicons name="link-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.btnVincularText}>Vincular rastreador</Text>
          </TouchableOpacity>
        </View>

        {/* Observações Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={20} color="#1976D2" />
            <Text style={styles.cardTitle}>Observações</Text>
          </View>
          <Text style={styles.notesText}>{petData.notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('EditPet', { pet: petData })}>
            <Ionicons name="pencil" size={18} color="#1E1E1E" style={{ marginRight: 8 }} />
            <Text style={styles.btnEditText}>Editar informações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRemove} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={18} color="#D32F2F" style={{ marginRight: 8 }} />
            <Text style={styles.btnRemoveText}>Remover pet</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 68,
  },
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: '#757575',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  badgeRed: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  badgeRedText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gpsDesc: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 16,
  },
  btnVincular: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnVincularText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  actionsContainer: {
    marginTop: 16,
  },
  btnEdit: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  btnEditText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  btnRemove: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  btnRemoveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  }
});
