import axios from 'axios';

// Creamos la instancia de Axios apuntando a tu backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Importante para enviar cookies si las usas
});

// Interceptor para inyectar automáticamente el token en cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;