import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>MyPet</Text>
        <Text style={styles.slogan}>Cuidar, conectar e proteger seu pet.</Text>
      </View>
      
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>CARREGANDO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1E1E1E',
    letterSpacing: -1,
    marginBottom: 16,
  },
  slogan: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#757575',
    letterSpacing: 2,
  }
});
