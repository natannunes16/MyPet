import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';

export default function EditarPerfilScreen({ navigation }) {
  const { profile, updateProfile } = usePet();
  const [name, setName] = useState(profile.name || 'Ana Carolina Silva');
  const [email, setEmail] = useState(profile.email || 'ana.carolina@exemplo.com');

  const handleSave = () => {
    updateProfile({ ...profile, name, email });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: profile.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
                style={styles.avatar} 
              />
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="pencil" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#424242" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#9E9E9E"
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={styles.inputLabel}>Endereço de E-mail</Text>
            <View style={[styles.inputContainer, { marginBottom: 0 }]}>
              <Ionicons name="mail-outline" size={20} color="#424242" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

          </View>
          
          <View style={{ flex: 1 }} />

          {/* Save Button */}
          <TouchableOpacity style={styles.btnSalvar} onPress={handleSave}>
            <Text style={styles.btnSalvarText}>Salvar alterações</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
    color: '#1E1E1E',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#1976D2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
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
    color: '#424242',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
  },
  btnSalvar: {
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 'auto',
  },
  btnSalvarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }
});
