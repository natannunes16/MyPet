import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header/Header';

export default function CriarAnuncioScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Criar Anúncio" />
      <View style={styles.content}>
        <Text style={styles.text}>Tela placeholder para criação de anúncios no marketplace.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  text: { fontSize: 16, color: colors.text },
});
