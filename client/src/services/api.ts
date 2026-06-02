import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage keys
const TOKEN_KEY = 'auth0_token';
const ID_TOKEN_KEY = 'auth0_id_token';

// Set the auth token for API requests
export const setAuthToken = (token: string | null, idToken?: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (idToken !== undefined) {
      if (idToken) {
        localStorage.setItem(ID_TOKEN_KEY, idToken);
        api.defaults.headers.common['X-Auth0-Id-Token'] = idToken;
      } else {
        localStorage.removeItem(ID_TOKEN_KEY);
        delete api.defaults.headers.common['X-Auth0-Id-Token'];
      }
    }
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ID_TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['X-Auth0-Id-Token'];
  }
};

// Initialize token from storage on load
const storedToken = localStorage.getItem(TOKEN_KEY);
const storedIdToken = localStorage.getItem(ID_TOKEN_KEY);
if (storedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}
if (storedIdToken) {
  api.defaults.headers.common['X-Auth0-Id-Token'] = storedIdToken;
}

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear it
      setAuthToken(null);
      // Optionally redirect to login
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
