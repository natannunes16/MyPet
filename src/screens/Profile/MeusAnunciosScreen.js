import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MeusAnunciosScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Anúncios</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="add-outline" size={24} color="#1976D2" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.emptyContainer}>
          <Ionicons name="megaphone-outline" size={60} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>Nenhum anúncio ativo</Text>
          <Text style={styles.emptySubtitle}>
            Você ainda não publicou nenhum anúncio no Marketplace.
          </Text>
          <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CriarAnuncio')}>
            <Text style={styles.createBtnText}>Criar meu primeiro anúncio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#FFF',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' },
  scrollContent: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  emptyContainer: {
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF',
    borderRadius: 16, padding: 32, borderWidth: 1, borderColor: '#E0E0E0', borderStyle: 'dashed'
  },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E1E', marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#757575', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  createBtn: {
    backgroundColor: '#FFD500', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24,
  },
  createBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' }
});
