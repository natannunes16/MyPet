import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import Header from '../../components/Header/Header';

export default function PrivacidadeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Privacidade" />
      <View style={styles.content}>
        <Text style={styles.text}>Placeholder para a tela de privacidade.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  text: { fontSize: 16, color: colors.text },
});
