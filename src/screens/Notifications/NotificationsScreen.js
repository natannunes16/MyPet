import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import MainHeader from '../../components/Header/MainHeader';

// Data definition moved inside component to access styles

export default function NotificationsScreen({ navigation }) {
  const notificationsData = [
    {
      id: '1',
      type: 'alert',
      content: <Text><Text style={styles.boldText}>Alerta na região!</Text> Um cachorro parecido com o "Bolinha" foi reportado perdido a 2km de você.</Text>,
      time: 'Agora mesmo',
    },
    {
      id: '2',
      type: 'walk',
      content: <Text><Text style={styles.boldText}>Passeio iniciado.</Text> O passeador Carlos acabou de iniciar a rota com o Rex. Acompanhe em tempo real.</Text>,
      time: 'Há 15 min',
    },
    {
      id: '3',
      type: 'comment',
      content: <Text><Text style={styles.boldText}>Mariana Silva</Text> comentou na sua publicação: "Que foto linda do Max no parque!"</Text>,
      time: 'Há 2 horas',
    },
    {
      id: '4',
      type: 'like',
      content: <Text><Text style={styles.boldText}>João e outras 12 pessoas</Text> curtiram a sua atualização sobre o treinamento da Luna.</Text>,
      time: 'Ontem',
    },
    {
      id: '5',
      type: 'promo',
      content: <Text><Text style={styles.boldText}>Oferta Especial!</Text> Aproveite 20% de desconto na linha premium de rações apenas este fim de semana.</Text>,
      time: 'Sexta-feira',
    },
  ];

  const renderItem = ({ item }) => {
    let iconName, iconColor, iconBg, borderLeftColor, timeColor;

    switch (item.type) {
      case 'alert':
        iconName = 'warning-outline';
        iconColor = '#D32F2F'; // Red
        iconBg = '#FFEBEE';
        borderLeftColor = '#D32F2F';
        timeColor = '#D32F2F';
        break;
      case 'walk':
        iconName = 'location-outline';
        iconColor = '#1976D2'; // Blue
        iconBg = '#E3F2FD';
        borderLeftColor = '#1976D2';
        timeColor = '#1976D2';
        break;
      case 'comment':
        iconName = 'chatbubble-outline';
        iconColor = '#424242'; // Dark gray
        iconBg = '#E0E0E0';
        borderLeftColor = 'transparent';
        timeColor = colors.textLight;
        break;
      case 'like':
        iconName = 'heart-outline';
        iconColor = '#424242';
        iconBg = '#E0E0E0';
        borderLeftColor = 'transparent';
        timeColor = colors.textLight;
        break;
      case 'promo':
        iconName = 'bag-outline';
        iconColor = '#424242';
        iconBg = '#E0E0E0';
        borderLeftColor = 'transparent';
        timeColor = colors.textLight;
        break;
      default:
        iconName = 'notifications-outline';
        iconColor = '#424242';
        iconBg = '#E0E0E0';
        borderLeftColor = 'transparent';
        timeColor = colors.textLight;
    }

    return (
      <View style={[styles.card, { borderLeftColor, borderLeftWidth: borderLeftColor !== 'transparent' ? 4 : 0 }]}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.contentText}>{item.content}</Text>
          <Text style={[styles.timeText, { color: timeColor }]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.titleRow}>
      <Text style={styles.mainTitle}>Notificações</Text>
      <TouchableOpacity>
        <Text style={styles.markReadText}>Marcar como lidas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader 
        showBack={true} 
        navigation={navigation} 
        hasUnreadNotifications={true} 
      />
      <FlatList
        data={notificationsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  markReadText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  timeText: {
    fontSize: 13,
  },
});
