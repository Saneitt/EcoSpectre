import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>EcoSpectre</Text>
        <Text style={styles.subtitle}>Scan products for sustainability</Text>
      </View>

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <MaterialCommunityIcons name="camera" size={32} color="white" />
        <Text style={styles.scanButtonText}>Start Scanning</Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How it works</Text>
        <View style={styles.stepContainer}>
          <Step
            icon="camera"
            title="Scan Product"
            description="Take a photo of any product"
          />
          <Step
            icon="magnify"
            title="Analysis"
            description="AI analyzes sustainability factors"
          />
          <Step
            icon="leaf"
            title="Get Score"
            description="See detailed sustainability metrics"
          />
        </View>
      </View>
    </View>
  );
};

type StepProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
};

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
  <View style={styles.step}>
    <MaterialCommunityIcons name={icon} size={32} color="#4CAF50" />
    <Text style={styles.stepTitle}>{title}</Text>
    <Text style={styles.stepDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
    gap: 12,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 40,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  stepContainer: {
    gap: 20,
  },
  step: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stepDescription: {
    color: '#666',
    flex: 1,
  },
});