import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePet } from '../../context/PetContext';
import api from '../../services/api';

export default function RegisterScreen({ navigation }) {
  const { updateProfile, clearPets } = usePet();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    if (/\d/.test(name)) {
      setErrorMsg('O nome não pode conter números.');
      return;
    }

    const validDomains = ['@gmail.com', '@outlook.com', '@hotmail.com'];
    const hasValidDomain = validDomains.some(domain => email.toLowerCase().endsWith(domain));

    if (!hasValidDomain) {
      setErrorMsg('Use um e-mail válido (@gmail.com, @outlook.com ou @hotmail.com).');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Você precisa aceitar os Termos de Serviço.');
      return;
    }

    setErrorMsg('');
    
    try {
      const response = await api.post('/auth/register', { 
        name, 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      if (response.data && response.data.token) {
        updateProfile({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
        });
        
        await AsyncStorage.setItem('@myPetToken', response.data.token);
        
        // Limpa os pets da memória e do AsyncStorage para simular uma conta zerada
        clearPets();
        AsyncStorage.removeItem('@myPetPets').catch(console.warn);
        
        navigation.replace('MainTabs'); 
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="paw" size={32} color="#1E1E1E" />
          </View>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Junte-se à comunidade MyPet e conecte-se com outros amantes de animais.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Como você gostaria de ser chamado"
              placeholderTextColor="#9E9E9E"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mínimo de 8 caracteres"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#757575" />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirmar Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="reload-outline" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#757575" />
            </TouchableOpacity>
          </View>
          
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, termsAccepted && styles.checkboxActive]} 
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              {termsAccepted && <Ionicons name="checkmark" size={16} color="#FFF" />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              Li e concordo com os <Text style={styles.linkText}>Termos de Serviço</Text> e <Text style={styles.linkText}>Diretrizes da Comunidade</Text>.
            </Text>
          </View>

          {/* Error Message */}
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : null}

          <TouchableOpacity style={styles.btnCriar} onPress={handleRegister}>
            <Text style={styles.btnCriarText}>Criar conta</Text>
            <Ionicons name="arrow-forward" size={18} color="#1E1E1E" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.textLight}>Já tenho conta. </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Entrar</Text>
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
    padding: 30,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  linkText: {
    color: '#1976D2',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  btnCriar: {
    backgroundColor: '#FFD500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 24,
  },
  btnCriarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLight: {
    color: '#757575',
    fontSize: 14,
  },
  link: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
