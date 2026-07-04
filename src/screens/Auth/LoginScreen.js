import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePet } from '../../context/PetContext';

export default function LoginScreen({ navigation, route }) {
  const { updateProfile } = usePet();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    
    try {
      const response = await api.post('/auth/login', { email: email.trim().toLowerCase(), password });
      
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('@myPetToken', response.data.token);
        updateProfile({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
        setError('');
        navigation.replace('MainTabs'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'E-mail ou senha incorretos.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.form}>
          {route.params?.newlyRegistered ? (
            <View style={styles.successMessageContainer}>
              <Text style={styles.successMessageText}>Conta criada com sucesso! Faça seu login.</Text>
            </View>
          ) : null}

          {/* Email Input */}
          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Header */}
          <View style={styles.passwordHeader}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#757575" />
            </TouchableOpacity>
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
            <Text style={styles.btnEntrarText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.btnGoogle}>
            <Ionicons name="logo-google" size={18} color="#4285F4" style={{ marginRight: 12 }} />
            <Text style={styles.btnGoogleText}>Continuar com Google</Text>
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.textLight}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgot: {
    color: '#1976D2',
    fontSize: 13,
    fontWeight: '500',
  },
  btnEntrar: {
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    marginTop: 10,
  },
  btnEntrarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#757575',
    fontSize: 14,
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 52,
    borderRadius: 12,
  },
  btnGoogleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  textLight: {
    color: '#757575',
    fontSize: 14,
  },
  link: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  successMessageContainer: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  successMessageText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
