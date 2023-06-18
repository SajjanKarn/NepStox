import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  async getItem(key) {
    return SecureStore.getItemAsync(key);
  },
  async setItem(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
  async removeItem(key) {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://cjntckintwssdfradiah.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqbnRja2ludHdzc2RmcmFkaWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcwNTkzMDAsImV4cCI6MjAwMjYzNTMwMH0.JyN3HMxwJ8mJ4oNriFmE5-3gAtKJsIL1SraRWys5Rew";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
