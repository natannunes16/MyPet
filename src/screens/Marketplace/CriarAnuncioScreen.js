import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, 
  TextInput, KeyboardAvoidingView, Platform, Alert, Switch, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme/colors';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function CriarAnuncioScreen({ navigation, route }) {
  const { addAd } = useMarketplace();
  const type = route.params?.type || 'Produto';
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isDonation, setIsDonation] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getCategories = () => {
    if (type === 'Animal') return ['Adoção', 'Venda', 'Castrado'];
    if (type === 'Produto') return ['Alimentação', 'Brinquedos', 'Higiene', 'Acessórios', 'Geral'];
    if (type === 'Serviço') return ['Banho e Tosa', 'Veterinário', 'Passeador', 'Hospedagem'];
    return [];
  };

  const pickImages = async () => {
    if (photos.length >= 6) {
      Alert.alert('Limite atingido', 'Você já adicionou o máximo de 6 fotos.');
      return;
    }
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar as fotos.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 6 - photos.length,
        quality: 1,
      });
      if (!result.canceled && result.assets) {
        setPhotos(prev => [...prev, ...result.assets.map(a => a.uri)]);
      }
    } catch (e) {
      console.log('Image picker error:', e);
    }
  };

  const handlePublish = () => {
    if (!title || !category || !location) {
      setErrorMsg('Preencha os campos obrigatórios (Título, Categoria e Localização)');
      return;
    }
    setErrorMsg('');

    const isAdocao = category === 'Adoção' || isDonation;
    
    const newItem = {
      id: 'market_' + Date.now().toString(),
      name: title,
      image: photos.length > 0 ? photos[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      tag: isAdocao ? 'ADOÇÃO' : type === 'Serviço' ? 'SERVIÇO' : 'VENDA',
      tagColor: isAdocao ? '#1976D2' : type === 'Serviço' ? '#9C27B0' : '#FFD500',
      age: type === 'Animal' ? 'Desconhecida' : 'Novo',
      species: category,
      breed: type === 'Animal' ? 'SRD' : 'Geral',
      location: location,
    };

    addAd(type, newItem);
    
    navigation.navigate('MarketplaceHome', { 
      newTab: type === 'Animal' ? 'Animais' : type === 'Produto' ? 'Produtos' : 'Serviços',
      timestamp: Date.now()
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MyPet</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1976D2" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          
          <View style={styles.header}>
            <Text style={styles.title}>Novo {type}</Text>
            <Text style={styles.subtitle}>Preencha os detalhes para publicar.</Text>
          </View>

          {/* Photos */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Fotos</Text>
            <View style={styles.photosRowWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosRow}>
                {photos.length < 6 && (
                  <TouchableOpacity style={styles.addPhotoBtn} onPress={pickImages}>
                    <Ionicons name="camera-outline" size={28} color="#1976D2" />
                    <Text style={styles.addPhotoText}>Adicionar</Text>
                  </TouchableOpacity>
                )}
                {photos.map((uri, index) => (
                  <View key={index} style={styles.photoContainerBox}>
                    <Image source={{ uri }} style={styles.selectedPhoto} />
                  </View>
                ))}
                {Array.from({ length: Math.max(0, 2 - photos.length) }).map((_, i) => (
                  <View key={`placeholder-${i}`} style={styles.photoPlaceholder}>
                    <Ionicons name="image-outline" size={28} color="#BDBDBD" />
                  </View>
                ))}
              </ScrollView>
            </View>
            <Text style={styles.photoHint}>Adicione até 6 fotos. A primeira será a capa.</Text>
          </View>

          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Título do anúncio</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={
                  type === 'Animal' ? 'Ex: Cachorro Golden Retriever filhote' :
                  type === 'Serviço' ? 'Ex: Banho e Tosa em domicílio' :
                  'Ex: Coleira vermelha tamanho M'
                }
                placeholderTextColor="#9E9E9E"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {getCategories().map((cat) => (
                <TouchableOpacity 
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Price / Donation */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Preço / Doação</Text>
            <View style={styles.priceRow}>
              <View style={[styles.inputContainer, styles.priceInput]}>
                <Text style={styles.currencyPrefix}>R$</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                  editable={!isDonation}
                />
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={isDonation}
                  onValueChange={setIsDonation}
                  trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
                  thumbColor={isDonation ? '#FFF' : '#F5F5F5'}
                />
                <Text style={styles.switchLabel}>É doação</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <View style={[styles.inputContainer, styles.inputContainerMulti]}>
              <TextInput
                style={styles.inputMulti}
                placeholder={
                  type === 'Animal' ? 'Fale sobre a personalidade do pet, vacinas, idade, motivo da doação/venda...' :
                  type === 'Serviço' ? 'Descreva os serviços prestados, horários de atendimento, experiência...' :
                  'Detalhes sobre o item, estado de conservação, motivo da venda...'
                }
                placeholderTextColor="#9E9E9E"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Localização</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="#1E1E1E" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sua cidade ou bairro"
                placeholderTextColor="#9E9E9E"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Error Message */}
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : null}

          {/* Publish Button */}
          <TouchableOpacity style={styles.btnPublish} onPressIn={handlePublish}>
            <Ionicons name="push-outline" size={20} color="#1E1E1E" style={{ marginRight: 8, transform: [{ rotate: '180deg' }] }} />
            <Text style={styles.btnPublishText}>Publicar anúncio</Text>
          </TouchableOpacity>

        </ScrollView>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  typeBtnActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  typeBtnTextActive: {
    color: '#1976D2',
  },
  formGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  photosRowWrapper: {
    flexDirection: 'row',
  },
  photosRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  photoContainerBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addPhotoBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D7CCC8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  addPhotoText: {
    fontSize: 12,
    color: '#1976D2',
    marginTop: 4,
    fontWeight: '500',
  },
  photoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    fontSize: 12,
    color: '#757575',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#FFF',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#FFD500',
    borderColor: '#FFD500',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  inputContainerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#424242',
  },
  inputContainerMulti: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 16,
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 1,
    marginRight: 16,
  },
  currencyPrefix: {
    fontSize: 14,
    color: '#424242',
    marginRight: 8,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1E1E1E',
  },
  btnPublish: {
    flexDirection: 'row',
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  btnPublishText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
