import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  FlatList, Image, Dimensions, ScrollView 
} from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { mockAnimals, mockProducts, mockServices } from '../../mocks/marketplaceMocks';
import MainHeader from '../../components/Header/MainHeader';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 32 - CARD_MARGIN * 2) / 2;

export default function MarketplaceScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Animais');

  const renderTab = (title) => {
    const isActive = activeTab === title;
    return (
      <TouchableOpacity 
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(title)}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {renderTab('Animais')}
        {renderTab('Produtos')}
        {renderTab('Serviços')}
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={24} color={colors.primary} style={styles.infoIcon} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Aviso Importante</Text>
          <Text style={styles.infoText}>
            Pratique adoção e venda responsável. Verifique as credenciais do tutor ou criador antes de tomar uma decisão.
          </Text>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Disponíveis</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
          <Text style={styles.filterText}>Filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={styles.cardImage} 
        />
        {/* Absolute Tag */}
        <View style={[styles.tagContainer, { backgroundColor: item.tagColor }]}>
          <Ionicons 
            name={item.tag === 'ADOÇÃO' ? 'heart-outline' : 'pricetag-outline'} 
            size={12} 
            color="#FFF" 
          />
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardAge}>{item.age}</Text>
        </View>
        <Text style={styles.cardSubtitle}>{item.species} • {item.breed}</Text>
        
        <View style={styles.cardLocationRow}>
          <Ionicons name="location-outline" size={12} color={colors.textLight} />
          <Text style={styles.cardLocationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getListData = () => {
    switch(activeTab) {
      case 'Animais': return mockAnimals;
      case 'Produtos': return mockProducts;
      case 'Serviços': return mockServices;
      default: return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader subtitle="marketplace" navigation={navigation} />

      <FlatList
        data={getListData()}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={renderCard}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.refreshBtn}>
              <Ionicons name="sync-outline" size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9F9F9' 
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerBtn: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContent: {
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFD700', // Amarelo
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activeTabText: {
    color: '#000',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F0FE', // Azul clarinho
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 4,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cardContent: {
    padding: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  cardAge: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 10,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocationText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  refreshBtn: {
    padding: 10,
  },
});
