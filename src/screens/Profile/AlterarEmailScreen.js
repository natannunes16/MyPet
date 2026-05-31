import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';

export default function AlterarEmailScreen({ navigation }) {
  const { profile, updateProfile } = usePet();
  const [currentEmail, setCurrentEmail] = useState(profile.email || '');
  const [newEmail, setNewEmail] = useState('');

  const handleUpdateEmail = () => {
    if (!newEmail.trim()) {
      Alert.alert('Erro', 'Por favor, insira o novo e-mail.');
      return;
    }
    
    if (newEmail === currentEmail) {
      Alert.alert('Erro', 'O novo e-mail não pode ser igual ao atual.');
      return;
    }

    const validDomains = ['@gmail.com', '@outlook.com', '@hotmail.com'];
    const hasValidDomain = validDomains.some(domain => newEmail.toLowerCase().endsWith(domain));

    if (!hasValidDomain) {
      Alert.alert('Erro', 'Use um e-mail válido (@gmail.com, @outlook.com ou @hotmail.com).');
      return;
    }

    // Atualiza o e-mail no contexto
    updateProfile({ email: newEmail });

    Alert.alert('Sucesso', 'Seu e-mail foi alterado com sucesso!');
    navigation.goBack();
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
        <Text style={styles.pageTitle}>Alterar E-mail</Text>
        <Text style={styles.pageSubtitle}>
          Mantenha seu e-mail atualizado para não perder nenhuma novidade do MyPet.
        </Text>

        <View style={styles.card}>
          <Text style={styles.inputLabel}>E-mail atual</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#757575" style={{ marginRight: 12 }} />
            <TextInput
              style={styles.input}
              value={currentEmail}
              editable={false}
              color="#9E9E9E"
            />
          </View>

          <Text style={styles.inputLabel}>Novo e-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#757575" style={{ marginRight: 12 }} />
            <TextInput
              style={styles.input}
              placeholder="Digite o novo e-mail"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={newEmail}
              onChangeText={setNewEmail}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.btnAtualizar} onPress={handleUpdateEmail}>
          <Ionicons name="save-outline" size={18} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.btnAtualizarText}>Salvar E-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnCancelarText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#F5F7FA',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1976D2' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 8, textAlign: 'center' },
  pageSubtitle: { fontSize: 14, color: '#757575', marginBottom: 32, textAlign: 'center', paddingHorizontal: 10 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 32,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 8, paddingHorizontal: 12, height: 48, marginBottom: 20,
  },
  input: { flex: 1, fontSize: 14, color: '#1E1E1E' },
  btnAtualizar: {
    backgroundColor: '#FFD500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 16, borderRadius: 12, marginBottom: 16,
  },
  btnAtualizarText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  btnCancelar: { alignItems: 'center', paddingVertical: 12 },
  btnCancelarText: { fontSize: 16, fontWeight: 'bold', color: '#1976D2' }
});
