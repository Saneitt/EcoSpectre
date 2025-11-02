import { ScanContext, SustainabilityScore, User, ScanRecord } from '../types';
import * as SecureStore from 'expo-secure-store';

const API_URL = __DEV__ 
  ? 'http://localhost:5000/api'
  : 'https://your-production-url.com/api';

const TOKEN_KEY = 'AUTH_TOKEN';

async function getAuthToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

async function setAuthToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function clearAuthToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    const response = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    await setAuthToken(response.token);
    return response.user;
  },

  async register(email: string, password: string) {
    const response = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    await setAuthToken(response.token);
    return response.user;
  },

  async logout() {
    await clearAuthToken();
  },

  // Scans
  async createScan(scanContext: ScanContext, score: SustainabilityScore, action: 'consumed' | 'rejected') {
    return fetchWithAuth('/scans', {
      method: 'POST',
      body: JSON.stringify({ ...scanContext, score, action }),
    });
  },

  async getScans(startDate?: Date, endDate?: Date) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    
    return fetchWithAuth(`/scans?${params}`);
  },

  // User
  async updateSettings(settings: User['settings']) {
    return fetchWithAuth('/users/settings', {
      method: 'PATCH',
      body: JSON.stringify({ settings }),
    });
  },

  async deleteAccount() {
    await fetchWithAuth('/users', {
      method: 'DELETE',
    });
    await clearAuthToken();
  },
};