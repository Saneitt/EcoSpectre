import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { List, Switch, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../store/auth';
import * as SecureStore from 'expo-secure-store';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useTheme();
  const { signOut, user } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(isDark);

  const handleSignOut = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Email"
            description={user?.email}
            left={(props: any) => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Change Password"
            left={(props: any) => <List.Icon {...props} icon="lock" />}
            onPress={() => {/* TODO: Implement password change */}}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          <List.Item
            title="Notifications"
            left={(props: any) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={theme.colors.primary}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            left={(props: any) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                color={theme.colors.primary}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Privacy Policy"
            left={(props: any) => <List.Icon {...props} icon="shield-account" />}
            onPress={() => {/* TODO: Open privacy policy */}}
          />
          <List.Item
            title="Terms of Service"
            left={(props: any) => <List.Icon {...props} icon="file-document" />}
            onPress={() => {/* TODO: Open terms of service */}}
          />
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props: any) => <List.Icon {...props} icon="information" />}
          />
        </List.Section>

        <List.Item
          title="Sign Out"
          left={(props: any) => <List.Icon {...props} icon="logout" color="#f44336" />}
          onPress={handleSignOut}
          titleStyle={{ color: '#f44336' }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});