import * as SecureStore from 'expo-secure-store';

const GEMINI_API_KEY = 'GEMINI_API_KEY';

export const secureStorage = {
  async setGeminiApiKey(apiKey: string) {
    await SecureStore.setItemAsync(GEMINI_API_KEY, apiKey);
  },

  async getGeminiApiKey() {
    return await SecureStore.getItemAsync(GEMINI_API_KEY);
  },

  async removeGeminiApiKey() {
    await SecureStore.deleteItemAsync(GEMINI_API_KEY);
  }
};