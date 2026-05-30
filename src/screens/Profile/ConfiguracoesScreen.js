import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConfiguracoesScreen({ navigation }) {
  const settingsOptions = [
    { id: '1', title: 'Notificações', icon: 'notifications-outline' },
    { id: '2', title: 'Privacidade', icon: 'lock-closed-outline' },
    { id: '3', title: 'Localização', icon: 'locate-outline' },
    { id: '4', title: 'Tema', icon: 'color-palette-outline', value: 'Claro' },
    { id: '5', title: 'Ajuda', icon: 'help-circle-outline' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MyPet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Configurações</Text>
        <Text style={styles.pageSubtitle}>
          Gerencie suas preferências de conta e aplicativo.
        </Text>

        <View style={styles.card}>
          {settingsOptions.map((item, index) => (
            <TouchableOpacity key={item.id} style={[styles.settingRow, index !== settingsOptions.length - 1 && styles.borderBottom]}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={20} color="#1976D2" />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              
              <View style={styles.rightContent}>
                {item.value && <Text style={styles.itemValue}>{item.value}</Text>}
                <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btnSair} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
          <Ionicons name="log-out-outline" size={20} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.btnText}>Sair da conta</Text>
        </TouchableOpacity>

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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  btnSair: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }
});
