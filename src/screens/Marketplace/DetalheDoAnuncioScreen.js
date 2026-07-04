import React, { useLayoutEffect } from 'react';
import {
  Share,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { colors } from '../../theme/colors';
import { mockProducts, mockAnimals, mockServices } from '../../mocks/marketplaceMocks';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function DetalheDoAnuncioScreen({ route, navigation }) {
  const { itemId } = route.params || {};
  const { animals, products, services } = useMarketplace();

  const product = products.find(p => p._id === itemId || p.id === itemId);
  const animal = animals.find(a => a._id === itemId || a.id === itemId);
  const service = services.find(s => s._id === itemId || s.id === itemId);

  const item = product || animal || service || {
    name: 'Anúncio não encontrado',
    tag: '',
    image: null,
    location: ''
  };

  const isVenda = item.tag === 'VENDA' || item.tag === 'OFERTA' || item.tag === 'NOVO' || item.tag === 'USADO';
  const price = (item.age && item.age.startsWith('R$')) ? item.age : (isVenda ? 'R$ 1.500,00' : null);

  let defaultDescription = '';
  if (animal) {
    defaultDescription = `Lindo ${item.species?.toLowerCase() || 'animal'} da raça ${item.breed || 'não definida'}. Vacinado e vermifugado. Muito dócil, brincalhão e saudável. Ideal para famílias com crianças. Acompanha carteirinha de vacinação.`;
  } else if (product) {
    defaultDescription = `Excelente ${item.name?.toLowerCase() || 'produto'} de alta qualidade. Ideal para o dia a dia do seu pet, proporcionando conforto e diversão. Produto durável, feito com materiais seguros e testado por especialistas. Garanta o melhor para o seu companheiro!`;
  } else if (service) {
    defaultDescription = `Serviço profissional de ${item.name?.toLowerCase() || 'atendimento'}. Nossa equipe conta com especialistas altamente qualificados para atender o seu pet com todo o amor e carinho que ele merece. Utilizamos produtos de primeira linha e garantimos a segurança do seu melhor amigo.`;
  } else {
    defaultDescription = 'Detalhes não disponíveis para este item.';
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: `Confira este anúncio: ${item.name}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.customHeader}>
      <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
      </TouchableOpacity>
      <Text style={styles.headerTitleText}>Detalhes</Text>
      <TouchableOpacity style={styles.headerButton} onPress={onShare}>
        <Ionicons name="share-social-outline" size={24} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );

  const renderImage = () => {
    const localImages = {
      'Coleira Premium': require('../../../assets/marketplace/coleira_premium.png'),
      'Petiscos Naturais': require('../../../assets/marketplace/petiscos_naturais.png'),
      'Cama Confortável': require('../../../assets/marketplace/cama_confortavel.png'),
      'Brinquedo Interativo': require('../../../assets/marketplace/brinquedo_interativo.png'),
      'Banho e Tosa': require('../../../assets/marketplace/banho_e_tosa.png'),
      'Consulta Veterinária': require('../../../assets/marketplace/consulta_veterinaria.png'),
      'Passeador de Cães': require('../../../assets/marketplace/passeador_de_caes.png'),
      'Hotel para Pets': require('../../../assets/marketplace/hotel_para_pets.png'),
    };
    const defaultImg = 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80';
    
    let imageSource = { uri: defaultImg };
    if (localImages[item.name]) {
      imageSource = localImages[item.name];
    } else if (item.image && typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('file'))) {
      imageSource = { uri: item.image };
    } else if (item.image && typeof item.image !== 'string') {
      imageSource = item.image;
    }

    return <Image source={imageSource} style={styles.image} resizeMode="cover" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Image and Pagination */}
        <View style={styles.imageContainer}>
          {renderImage()}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Header Info */}
          <Text style={styles.title}>{item.name}</Text>

          <View style={styles.tagsContainer}>
            {item.species && (
              <View style={styles.tag}>
                <MaterialCommunityIcons name="paw" size={14} color="#555" style={{ marginRight: 4 }} />
                <Text style={styles.tagText}>{item.species}</Text>
              </View>
            )}
            {item.breed && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.breed === 'Beagle' ? 'Macho' : item.breed}</Text>
              </View>
            )}
          </View>

          {price && <Text style={styles.price}>{price}</Text>}

          <View style={styles.divider} />

          {/* Seller Profile */}
          <View style={styles.sellerContainer}>
            <View style={styles.sellerInfo}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }}
                style={styles.sellerAvatar}
              />
              <View>
                <Text style={styles.sellerName}>{item.ownerName || 'Usuário'}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star-outline" size={14} color="#333" />
                  <Text style={styles.ratingText}>5.0 (Novo vendedor)</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewProfileText}>Ver perfil</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>
            {item.description || defaultDescription}
          </Text>

          {/* Location */}
          <Text style={styles.sectionTitle}>Localização</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={20} color="#333" style={{ marginTop: 2 }} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.locationText}>{item.location || 'São Paulo - SP'}</Text>
              <Text style={styles.distanceText}>Aprox. 5km de você</Text>
            </View>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapPlaceholder}>
            <Image
              source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=-23.589,-46.634&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7C-23.589,-46.634&key=YOUR_API_KEY' }}
              style={styles.mapImage}
              defaultSource={{ uri: 'https://via.placeholder.com/400x200.png?text=Mapa' }}
            />
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="heart-outline" size={20} color={colors.primary} />
          <Text style={styles.saveButtonText}>Salvar anúncio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#333" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerButton: {
    padding: 4,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  scrollContent: {
    paddingBottom: 100, // Make room for bottom bar
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#555',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7B61FF', // matching the design a bit or using a dark gold
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 24,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  viewProfileText: {
    color: colors.primary || '#0056b3',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  distanceText: {
    fontSize: 13,
    color: '#777',
  },
  mapPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'column',
    gap: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FFD700', // Yellow from the design
  },
  contactButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
