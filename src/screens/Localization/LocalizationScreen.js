import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  Image, ImageBackground, Modal, ScrollView, Dimensions, Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { usePet } from '../../context/PetContext';
import MainHeader from '../../components/Header/MainHeader';
import api from '../../services/api';

const { width, height } = Dimensions.get('window');

const mapHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      body { margin: 0; padding: 0; }
      iframe { width: 100vw; height: 100vh; border: none; }
    </style>
  </head>
  <body>
    <iframe 
      src="https://maps.google.com/maps?q=Unifacisa+Campina+Grande+58411-020&t=&z=16&ie=UTF8&iwloc=&output=embed" 
      frameborder="0" 
      allowfullscreen>
    </iframe>
  </body>
</html>
`;

export default function LocalizationScreen({ navigation }) {
  const { profile } = usePet();
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState('1h');
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await api.get('/locations');
        if (res.data && res.data.length > 0) {
          // Assume the latest location or the one for the current pet
          const petLocation = res.data.find(loc => loc.petId === (profile.id || profile._id)) || res.data[0];
          setLocationData(petLocation);
        }
      } catch (error) {
        console.warn('Failed to fetch location:', error);
      }
    };
    fetchLocation();
  }, [profile]);

  // Pet avatar placeholder se não tiver
  const petAvatar = profile.avatar ? { uri: profile.avatar } : { uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' };
  const petName = profile.name || 'Max';

  const isLost = locationData?.isLost;

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader subtitle="localizar" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} showsVerticalScrollIndicator={false}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <Text style={styles.pageTitle}>Localizar meu animal</Text>
          
          <View style={styles.petCard}>
            <Image source={petAvatar} style={styles.petAvatar} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{petName}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, isLost && { backgroundColor: '#D32F2F' }]} />
                <Text style={[styles.statusText, isLost && { color: '#D32F2F', fontWeight: 'bold' }]}>
                  {isLost ? 'Modo Perdido Ativo' : 'Conectado • Atualizado agora'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          {Platform.OS === 'web' ? (
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Unifacisa+Campina+Grande+58411-020&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={true}
              />
            </div>
          ) : (
            <WebView
              source={{ html: mapHtml }}
              style={StyleSheet.absoluteFillObject}
              scrollEnabled={false}
              bounces={false}
            />
          )}

          <View style={[StyleSheet.absoluteFillObject, styles.mapCenter]} pointerEvents="none">
            {/* Fake Map Pin */}
            <View style={styles.pinWrapper}>
              <View style={styles.pinBubble}>
                <View style={styles.pinInnerDark} />
              </View>
              <View style={styles.pinTriangle} />
            </View>
          </View>

          <View style={styles.mapOverlay} pointerEvents="box-none">
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.infoText}>
                Funcionalidade preparada para integração futura com rastreadores GPS de parceiros.
              </Text>
            </View>
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapBtn}>
                <Ionicons name="locate" size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapBtn}>
                <Ionicons name="layers-outline" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Sheet Actions */}
        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionSquareBtn} onPress={() => setModalVisible(true)}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="share-social" size={20} color={colors.primary} />
              </View>
              <Text style={styles.actionSquareText}>Compartilhar{"\n"}localização</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionSquareBtn}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="time-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.actionSquareText}>Ver{"\n"}histórico</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.lostModeBtn} onPress={() => navigation.navigate('ModoPerdido')}>
            <Ionicons name="warning-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.lostModeBtnText}>Ativar modo perdido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Compartilhar localização</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <View style={styles.modalHero}>
                <View style={styles.bigIconCircle}>
                  <Ionicons name="location" size={28} color={colors.primary} />
                </View>
                <Text style={styles.modalSubtitle}>
                  Envie a localização do seu pet para{"\n"}pessoas de confiança.
                </Text>
              </View>

              <View style={styles.linkMockBox}>
                <Text style={styles.mockCodeText}>{')]">'}</Text>
                <View style={styles.mockLinkPill}>
                  <Ionicons name="paw" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={styles.mockLinkText}>{petName} - Localização Atual</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Como deseja compartilhar?</Text>
              <View style={styles.shareOptionsRow}>
                <TouchableOpacity style={styles.shareOption}>
                  <View style={[styles.shareOptionIcon, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="logo-whatsapp" size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.shareOptionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareOption}>
                  <View style={[styles.shareOptionIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="link" size={24} color={colors.primary} />
                  </View>
                  <Text style={styles.shareOptionText}>Copiar link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareOption}>
                  <View style={[styles.shareOptionIcon, { backgroundColor: '#FCE4EC' }]}>
                    <Ionicons name="person-add-outline" size={24} color="#E91E63" />
                  </View>
                  <Text style={styles.shareOptionText}>Com usuário</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>Duração do compartilhamento</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.durationRow}>
                <TouchableOpacity 
                  style={[styles.durationPill, duration === '1h' && styles.durationPillActive]}
                  onPress={() => setDuration('1h')}
                >
                  <Text style={[styles.durationText, duration === '1h' && styles.durationTextActive]}>Por 1 hora</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.durationPill, duration === '24h' && styles.durationPillActive]}
                  onPress={() => setDuration('24h')}
                >
                  <Text style={[styles.durationText, duration === '24h' && styles.durationTextActive]}>Por 24 horas</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.durationPill, duration === 'always' && styles.durationPillActive]}
                  onPress={() => setDuration('always')}
                >
                  <Text style={[styles.durationText, duration === 'always' && styles.durationTextActive]}>Até desativar</Text>
                </TouchableOpacity>
              </ScrollView>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.generateBtn}>
                <Ionicons name="share-social-outline" size={20} color="#000" style={{ marginRight: 8 }} />
                <Text style={styles.generateBtnText}>Gerar link...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  headerMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerBtn: {
    padding: 4,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    padding: 16,
    backgroundColor: '#FFF',
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  petAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: '#666',
  },
  dropdownBtn: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 20,
  },
  mapContainer: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    lineHeight: 18,
  },
  mapCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinWrapper: {
    alignItems: 'center',
  },
  pinBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  pinInnerDark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#4FC3F7',
  },
  pinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFF',
    marginTop: -2,
  },
  mapControls: {
    alignSelf: 'flex-end',
    marginBottom: 30, // Acima do bottom sheet
  },
  mapBtn: {
    backgroundColor: '#FFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: -20, // Sobrepõe o mapa
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionSquareBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconCircleBlue: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionSquareText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  lostModeBtn: {
    flexDirection: 'row',
    backgroundColor: '#D32F2F', // Vermelho forte
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
  },
  lostModeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%', // Ocupa a maior parte da tela
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  closeBtn: {
    padding: 4,
  },
  modalScroll: {
    padding: 24,
  },
  modalHero: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bigIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  linkMockBox: {
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
    height: 140,
  },
  mockCodeText: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#BDBDBD',
  },
  mockLinkPill: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  mockLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  shareOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  shareOption: {
    alignItems: 'center',
    width: '30%',
  },
  shareOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareOptionText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  durationRow: {
    paddingRight: 24,
  },
  durationPill: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    backgroundColor: '#FFF',
  },
  durationPillActive: {
    borderColor: colors.primary,
    backgroundColor: '#E3F2FD',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  durationTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  modalFooter: {
    padding: 24,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  generateBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFD700', // Amarelo
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
