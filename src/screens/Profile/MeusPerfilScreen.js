import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header/Header';

export default function MeusPerfilScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Meu Perfil" />
      <View style={styles.content}>
        <Text style={styles.text}>Placeholder para a tela de perfil do usuário.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  text: { fontSize: 16, color: colors.text },
});
