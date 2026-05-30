import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DiretrizesComunidadeScreen({ navigation }) {
  const guidelines = [
    {
      title: 'Respeito Mútuo',
      desc: 'Trate todos os membros com respeito e gentileza. Não toleramos discurso de ódio, assédio, ou discriminação de qualquer tipo.',
      icon: 'heart-outline'
    },
    {
      title: 'Sem Abuso',
      desc: 'É estritamente proibido compartilhar conteúdo que promova ou exiba qualquer forma de abuso animal ou humano.',
      icon: 'ban-outline'
    },
    {
      title: 'Bem-estar Animal',
      desc: 'Incentivamos práticas saudáveis e seguras de cuidado com os pets. Conteúdos que demonstrem maus-tratos ou negligência serão removidos.',
      icon: 'paw-outline'
    },
    {
      title: 'Anúncios Responsáveis',
      desc: 'Vendas ou adoções devem ser feitas de forma ética. Não permitimos a venda de animais exóticos ilegais ou criadouros irregulares.',
      icon: 'storefront-outline'
    },
    {
      title: 'Não é Conselho Médico',
      desc: 'As informações compartilhadas aqui não substituem a orientação de um veterinário profissional. Sempre consulte um especialista para questões de saúde do seu pet.',
      icon: 'medkit-outline'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1976D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MyPet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Diretrizes da comunidade</Text>
        <Text style={styles.pageSubtitle}>
          Para manter nosso ambiente seguro e acolhedor para todos os amantes de pets, pedimos que siga estas regras básicas.
        </Text>

        <View style={styles.card}>
          {guidelines.map((item, index) => (
            <View key={index} style={[styles.guidelineRow, index !== guidelines.length - 1 && styles.borderBottom]}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={20} color="#1976D2" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btnEntendi} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Entendi</Text>
          <Ionicons name="checkmark" size={18} color="#000" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Ao continuar, você concorda em seguir estas diretrizes.
        </Text>

      </ScrollView>
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
    color: '#1976D2',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 24,
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
    marginBottom: 24,
  },
  guidelineRow: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  btnEntendi: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9E9E9E',
  }
});
