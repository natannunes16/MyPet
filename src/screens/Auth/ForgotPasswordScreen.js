import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendLink = () => {
    if (!email.trim()) {
      setErrorMsg('Por favor, informe seu e-mail.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Por favor, insira um e-mail válido com @.');
      return;
    }
    setErrorMsg('');
    Alert.alert('Sucesso', 'Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.', [
      { text: 'Voltar ao Login', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#1E1E1E" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.subtitle}>Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.</Text>
          
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
          
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          
          <TouchableOpacity style={styles.btnSend} onPress={handleSendLink}>
            <Text style={styles.btnSendText}>Enviar link</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    flexGrow: 1,
    padding: 30,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E1E1E',
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#757575',
    lineHeight: 22,
    marginBottom: 32,
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
  btnSend: {
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    marginTop: 10,
  },
  btnSendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
