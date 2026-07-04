import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Image, Alert, DeviceEventEmitter } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { usePet } from '../../context/PetContext';

export default function EditPetScreen({ route, navigation }) {
  const { pet } = route.params;
  
  const [petName, setPetName] = useState(pet?.name || '');
  const [species, setSpecies] = useState(pet?.species || 'Cachorro');
  const [breed, setBreed] = useState(pet?.breed || '');
  const [age, setAge] = useState(pet?.age?.toString() || '');
  const [gender, setGender] = useState(pet?.gender || 'Macho');
  const [petImageUri, setPetImageUri] = useState(pet?.image || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('onCropDone', (cropped) => {
      if (cropped && cropped.uri) {
        setPetImageUri(cropped.uri);
      }
    });
    return () => sub.remove();
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar a foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        navigation.navigate('ImageCrop', {
          imageUri: asset.uri,
          imageWidth: asset.width,
          imageHeight: asset.height,
          forceRatio: true,
        });
      }
    } catch (e) {
      console.log('Image picker error:', e);
    }
  };

  const { updatePet } = usePet();

  const handleSave = async () => {
    if (!petName) {
      Alert.alert('Atenção', 'Por favor, informe o nome do pet.');
      return;
    }
    
    setLoading(true);
    try {
      await updatePet(pet._id || pet.id, {
        name: petName,
        species: species,
        breed: breed || 'SRD',
        age: age,
        gender: gender,
        image: petImageUri || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      });
      
      Alert.alert('Sucesso', 'Pet atualizado com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Pet</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Edite os dados do pet</Text>
          <Text style={styles.subtitle}>Mantenha as informações do seu companheiro sempre atualizadas.</Text>
        </View>

        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
            {petImageUri ? (
              <Image source={{ uri: petImageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <>
                <Ionicons name="camera-outline" size={32} color="#1976D2" />
                <Text style={styles.photoText}>Alterar foto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Nome do Pet</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Rex, Luna"
              placeholderTextColor="#9E9E9E"
              value={petName}
              onChangeText={setPetName}
            />
          </View>

          <Text style={styles.inputLabel}>Espécie</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity 
              style={[styles.pillBtn, species === 'Cachorro' && styles.pillBtnActive]}
              onPress={() => setSpecies('Cachorro')}
            >
              <Text style={[styles.pillText, species === 'Cachorro' && styles.pillTextActive]}>Cachorro</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pillBtn, species === 'Gato' && styles.pillBtnActive]}
              onPress={() => setSpecies('Gato')}
            >
              <Text style={[styles.pillText, species === 'Gato' && styles.pillTextActive]}>Gato</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pillBtn, species === 'Outro' && styles.pillBtnActive]}
              onPress={() => setSpecies('Outro')}
            >
              <Text style={[styles.pillText, species === 'Outro' && styles.pillTextActive]}>Outro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Raça</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Golden Retriever, SRD"
              placeholderTextColor="#9E9E9E"
              value={breed}
              onChangeText={setBreed}
            />
          </View>

          <View style={styles.splitRow}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text style={styles.inputLabel}>Idade</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Anos"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.inputLabel}>Sexo</Text>
              <View style={styles.rowButtons}>
                <TouchableOpacity 
                  style={[styles.pillBtn, gender === 'Macho' && styles.pillBtnActive, { paddingHorizontal: 12 }]}
                  onPress={() => setGender('Macho')}
                >
                  <Ionicons name="male" size={16} color={gender === 'Macho' ? "#1E1E1E" : "#424242"} style={{ marginRight: 4 }} />
                  <Text style={[styles.pillText, gender === 'Macho' && styles.pillTextActive]}>Macho</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.pillBtn, gender === 'Fêmea' && styles.pillBtnActive, { paddingHorizontal: 12 }]}
                  onPress={() => setGender('Fêmea')}
                >
                  <Ionicons name="female" size={16} color={gender === 'Fêmea' ? "#1E1E1E" : "#424242"} style={{ marginRight: 4 }} />
                  <Text style={[styles.pillText, gender === 'Fêmea' && styles.pillTextActive]}>Fêmea</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.btnSalvar, loading && { opacity: 0.7 }]} onPress={handleSave} disabled={loading}>
            <Text style={styles.btnSalvarText}>{loading ? 'Salvando...' : 'Salvar pet'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
    backgroundColor: '#FAFAFA',
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoUpload: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D7CCC8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  photoText: {
    fontSize: 12,
    color: '#424242',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  input: {
    fontSize: 14,
    color: '#1E1E1E',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  pillBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  pillBtnActive: {
    backgroundColor: '#FFD500',
    borderColor: '#FFD500',
  },
  pillText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#1E1E1E',
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnSalvar: {
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  btnSalvarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
