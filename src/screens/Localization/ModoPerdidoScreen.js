import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, 
  TextInput, Image, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme/colors';
import { usePet } from '../../context/PetContext';
import api from '../../services/api';

export default function ModoPerdidoScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState('');
  const [phone, setPhone] = useState('');

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar a foto.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled && result.assets?.[0]) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log('Image picker error:', e);
    }
  };

  const { profile } = usePet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAlert = async () => {
    if (!location || !features || !phone) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      petId: profile.id || profile._id || 'unknown_pet',
      petName: profile.name || 'Meu Pet',
      petPhoto: photoUri || profile.avatar || '',
      address: location,
      isLost: true,
      status: 'lost',
      description: `${features} | Contato: ${phone}`
    };

    try {
      await api.post('/locations', payload);
      Alert.alert('Modo Perdido', 'Alerta criado com sucesso! A comunidade será notificada.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.warn('Erro ao criar alerta de modo perdido:', error);
      Alert.alert('Erro', 'Não foi possível criar o alerta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modo perdido</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <View style={styles.alertIconContainer}>
              <Ionicons name="warning-outline" size={32} color="#D32F2F" />
            </View>
            <Text style={styles.title}>Ativar Modo Perdido</Text>
            <Text style={styles.subtitle}>
              Preencha as informações abaixo para criar um alerta. A comunidade na sua região será notificada imediatamente para ajudar nas buscas.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Foto Recente</Text>
            <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.uploadedPhoto} />
              ) : (
                <>
                  <View style={styles.cameraCircle}>
                    <Ionicons name="camera-outline" size={24} color="#1E1E1E" />
                  </View>
                  <Text style={styles.photoText}>Adicionar foto clara do seu pet</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Visto por último em</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="#1E1E1E" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Praça do Japão, Batel"
                placeholderTextColor="#9E9E9E"
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <TouchableOpacity style={styles.locationAction}>
              <Ionicons name="locate" size={16} color="#1976D2" />
              <Text style={styles.locationActionText}>Usar minha localização atual</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Características & Coleira</Text>
            <View style={[styles.inputContainer, styles.inputContainerMulti]}>
              <TextInput
                style={styles.inputMulti}
                placeholder="Ex: Usava coleira vermelha, está mancando, tem medo de barulho..."
                placeholderTextColor="#9E9E9E"
                multiline
                numberOfLines={3}
                value={features}
                onChangeText={setFeatures}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Telefone para contato</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#1E1E1E" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="(11) 98765-4321"
                placeholderTextColor="#9E9E9E"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <Text style={styles.previewTitle}>Pré-visualização do Alerta</Text>
          <View style={styles.previewCard}>
            <View style={styles.previewBanner}>
              <Ionicons name="megaphone-outline" size={16} color="#FFF" />
              <Text style={styles.previewBannerText}>ALERTA DE PET PERDIDO</Text>
            </View>
            <View style={styles.previewContent}>
              <Image 
                source={{ uri: photoUri || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' }} 
                style={styles.previewImage} 
              />
              <View style={styles.previewInfo}>
                <Text style={styles.previewName}>Max</Text>
                <View style={styles.previewRow}>
                  <Ionicons name="location-outline" size={14} color="#424242" />
                  <Text style={styles.previewText}>{location || 'Praça do Japão, Batel'}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Ionicons name="time-outline" size={14} color="#424242" />
                  <Text style={styles.previewText}>Há 2 horas</Text>
                </View>
              </View>
            </View>
          </View>

        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnAlert} onPress={handleAlert}>
            <Ionicons name="notifications-outline" size={20} color="#1E1E1E" style={{ marginRight: 8 }} />
            <Text style={styles.btnAlertText}>Alertar comunidade</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  iconBtn: {
    padding: 8,
  },
  placeholderIcon: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  scroll: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  alertIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  photoUpload: {
    height: 120,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cameraCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFF',
  },
  inputContainerMulti: {
    height: 80,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
  },
  inputMulti: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
    textAlignVertical: 'top',
  },
  locationAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationActionText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginTop: 8,
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    overflow: 'hidden',
  },
  previewBanner: {
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  previewBannerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  previewContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  previewText: {
    fontSize: 13,
    color: '#424242',
    marginLeft: 6,
  },
  footer: {
    padding: 24,
    paddingTop: 12,
    backgroundColor: '#FAFAFA',
  },
  btnAlert: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  btnAlertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
