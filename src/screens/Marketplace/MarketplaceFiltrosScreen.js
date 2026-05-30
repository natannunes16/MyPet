import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function MarketplaceFiltrosScreen({ navigation, route }) {
  const { activeTab, selectedFilter } = route.params || {};
  const [currentFilter, setCurrentFilter] = useState(selectedFilter || '');

  const getCategories = () => {
    if (activeTab === 'Animais') return ['Adoção', 'Venda', 'Castrado'];
    if (activeTab === 'Produtos') return ['Alimentação', 'Brinquedos', 'Higiene', 'Acessórios', 'Geral'];
    if (activeTab === 'Serviços') return ['Banho e Tosa', 'Veterinário', 'Passeador', 'Hospedagem'];
    return [];
  };

  const handleApply = () => {
    navigation.navigate('MarketplaceHome', { 
      selectedFilter: currentFilter,
      newTab: activeTab,
      timestamp: Date.now() 
    });
  };

  const handleClear = () => {
    setCurrentFilter('');
    navigation.navigate('MarketplaceHome', { 
      selectedFilter: '',
      newTab: activeTab,
      timestamp: Date.now() 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={28} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtros - {activeTab}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        
        <View style={styles.chipContainer}>
          {getCategories().map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                currentFilter === cat && styles.chipActive
              ]}
              onPress={() => setCurrentFilter(currentFilter === cat ? '' : cat)}
            >
              <Text style={[
                styles.chipText,
                currentFilter === cat && styles.chipTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearBtnText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyBtnText}>Aplicar Filtro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: {
    backgroundColor: '#FFD500',
    borderColor: '#FFD500',
  },
  chipText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    gap: 16,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#757575',
  },
  applyBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FFD500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
