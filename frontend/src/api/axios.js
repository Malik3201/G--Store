import axios from 'axios';

const normalizeApiBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_URL?.trim();
  const fallbackUrl = 'http://localhost:5000/api';

  if (!rawUrl) return fallbackUrl;

  const cleaned = rawUrl.replace(/\/+$/, '');
  return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
};

const api = axios.create({
  baseURL: normalizeApiBaseUrl(),
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
