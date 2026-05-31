import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';

export default function AlterarSenhaScreen({ navigation }) {
  const { profile, updateProfile } = usePet();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    if (currentPassword !== profile.password) {
      setErrorMsg('Senha atual não condiz com a sua senha.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('A nova senha e a confirmação não coincidem.');
      return;
    }

    setErrorMsg('');

    // Atualiza a senha no contexto
    updateProfile({ password: newPassword });

    // Simulando alteração com sucesso
    Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!');
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
        <Text style={styles.pageTitle}>Alterar Senha</Text>
        <Text style={styles.pageSubtitle}>
          Para sua segurança, recomendamos o uso de senhas fortes.
        </Text>

        <View style={styles.card}>
          {/* Senha Atual */}
          <Text style={styles.inputLabel}>Senha atual</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Sua senha atual"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Ionicons name={showCurrent ? "eye-outline" : "eye-off-outline"} size={20} color="#424242" />
            </TouchableOpacity>
          </View>

          {/* Nova Senha */}
          <Text style={styles.inputLabel}>Nova senha</Text>
          <View style={[styles.inputContainer, { marginBottom: 4 }]}>
            <TextInput
              style={styles.input}
              placeholder="Sua nova senha"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons name={showNew ? "eye-outline" : "eye-off-outline"} size={20} color="#424242" />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>Deve ter pelo menos 8 caracteres.</Text>

          {/* Confirmar Nova Senha */}
          <Text style={styles.inputLabel}>Confirmar nova senha</Text>
          <View style={[styles.inputContainer, { marginBottom: 0 }]}>
            <TextInput
              style={styles.input}
              placeholder="Repita a nova senha"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={20} color="#424242" />
            </TouchableOpacity>
          </View>
        </View>

        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : null}

        <TouchableOpacity style={styles.btnAtualizar} onPress={handleUpdatePassword}>
          <Ionicons name="reload-outline" size={18} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.btnAtualizarText}>Atualizar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnCancelarText}>Cancelar</Text>
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
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
  },
  helperText: {
    fontSize: 12,
    color: '#1E1E1E',
    marginBottom: 20,
  },
  btnAtualizar: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  btnAtualizarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  btnCancelar: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  btnCancelarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  }
});
