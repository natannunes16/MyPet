import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import { colors } from '../../theme/colors';

export default function StoriesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Stories" />
      <View style={styles.content}>
        <Text style={styles.text}>Esta é a tela de Stories. Conteúdo futuro aqui.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { fontSize: 16, color: colors.text }
});
