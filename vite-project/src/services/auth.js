import axios from 'axios';

const API_URL = 'https://wedev-api.sky.pro/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export async function registerUser({ name, login, password }) {
  try {
    const response = await api.post('/user', {
      name,
      login,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Ошибка регистрации';
  }
}

export async function loginUser({ login, password }) {
  try {
    const response = await api.post('/user/login', {
      login,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Ошибка входа';
  }
}

export function logout() {
  localStorage.removeItem('token');
}