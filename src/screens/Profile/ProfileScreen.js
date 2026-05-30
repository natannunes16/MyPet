import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';
import MainHeader from '../../components/Header/MainHeader';

export default function ProfileScreen({ navigation }) {
  const { profile, pets } = usePet();
  const myPets = pets || [];

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader subtitle="perfil" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profile.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
              style={styles.avatar} 
            />
          </View>
          
          <Text style={styles.name}>{profile.name || 'Ana Silva'}</Text>
          <Text style={styles.email}>{profile.email || 'ana.silva@example.com'}</Text>
          
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: colors.primary }]}>
              <Text style={[styles.tagText, { color: '#000' }]}>Pet Lover</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#E0E0E0' }]}>
              <Text style={styles.tagText}>Membro desde 2023</Text>
            </View>
          </View>
        </View>

        {/* Meus Pets Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Pets</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddFirstPet')}>
            <Ionicons name="add" size={16} color="#1976D2" />
            <Text style={styles.addBtnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {myPets.map(pet => (
          <View key={pet.id} style={styles.petCard}>
            <Image source={{ uri: pet.image }} style={styles.petImage} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petDesc}>{pet.description}</Text>
            </View>
            <View style={styles.petActions}>
              <TouchableOpacity style={styles.actionIconBtn}>
                <Ionicons name="pencil" size={18} color="#1976D2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIconBtn}>
                <Ionicons name="trash-outline" size={18} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Menu List Section */}
        <View style={styles.menuContainer}>
          <MenuItem icon="person-outline" title="Editar perfil" onPress={() => navigation.navigate('EditarPerfil')} />
          <MenuItem icon="mail-outline" title="Alterar e-mail" onPress={() => {}} />
          <MenuItem icon="lock-closed-outline" title="Alterar senha" onPress={() => navigation.navigate('AlterarSenha')} />
          <MenuItem icon="megaphone-outline" title="Meus anúncios" onPress={() => {}} />
          <MenuItem icon="book-outline" title="Diretrizes" onPress={() => navigation.navigate('DiretrizesComunidade')} />
          <MenuItem icon="settings-outline" title="Configurações" onPress={() => navigation.navigate('Configuracoes')} />
          <MenuItem icon="log-out-outline" title="Sair" color="#D32F2F" isLast={true} onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Subcomponent for Menu Items
const MenuItem = ({ icon, title, color = '#1E1E1E', isLast = false, onPress }) => (
  <TouchableOpacity style={[styles.menuItem, !isLast && styles.menuItemBorder]} onPress={onPress}>
    <Ionicons name={icon} size={22} color={color} style={styles.menuIcon} />
    <Text style={[styles.menuText, { color }]}>{title}</Text>
    {!isLast && <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Fundo levemente cinza
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1976D2',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginLeft: 2,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  petDesc: {
    fontSize: 14,
    color: '#757575',
  },
  petActions: {
    justifyContent: 'space-between',
    height: 50,
  },
  actionIconBtn: {
    padding: 4,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
