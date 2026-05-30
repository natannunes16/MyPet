import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    
    setError('');
    // Simulando o login para irem para o AppPrincipal
    navigation.replace('MainTabs'); 
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Acesse sua conta</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <Text style={styles.forgot}>Esqueci minha senha</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Button title="Entrar" onPress={handleLogin} style={{ marginTop: 20 }} />
          
          <View style={styles.registerContainer}>
            <Text style={styles.textLight}>Ainda não tem conta?</Text>
            <Text style={styles.link}> Cadastre-se</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  forgot: {
    color: colors.secondary,
    textAlign: 'right',
    marginTop: -5,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textLight: {
    color: colors.textLight,
  },
  link: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '500',
  }
});
