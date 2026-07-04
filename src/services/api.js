import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// URL base para o backend
// IMPORTANTE: Configure a URL base corretamente para o seu ambiente.
// - No emulador Android do Android Studio: use 'http://10.0.2.2:3000/api'
// - Na web ou iOS simulador: use 'http://localhost:3000/api'
// - No dispositivo físico (Expo Go): substitua pelo IP da sua máquina na rede (ex: 'http://192.168.0.x:3000/api')
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

// Adiciona o token JWT em cada requisição
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@myPetToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
