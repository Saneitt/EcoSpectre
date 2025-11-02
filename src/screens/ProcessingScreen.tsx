import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { ScanContext, SustainabilityScore, ScanRecord } from '../types';
import { analyzeImageWithGemini, getSustainabilityScore } from '../services/gemini';
import { api } from '../services/api';
import LottieView from 'lottie-react-native';
import * as FileSystem from 'expo-file-system';

type Props = NativeStackScreenProps<RootStackParamList, 'Processing'>;

export const ProcessingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [status, setStatus] = useState('Analyzing image...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    processImage();
  }, []);

  const processImage = async () => {
    try {
      // Step 1: Analyze image with Gemini Vision API
      setStatus('Analyzing image with AI...');
      const context = await analyzeImageWithGemini(imageUri);
      
      // Step 2: Get sustainability score from Gemini
      setStatus('Calculating sustainability score...');
      const score = await getSustainabilityScore(context);

      // Step 3: Generate thumbnail for history
      setStatus('Processing image...');
      const thumb = await generateThumbnail(imageUri);
      
      // Step 4: Create scan record
      const scanRecord: Partial<ScanRecord> = {
        context: {
          ...context,
          image: imageUri,
          image_thumb: thumb
        },
        score,
        action: 'consumed', // Default action, can be changed in result screen
        timestamp: Date.now()
      };

      // Navigate to result screen
      navigation.replace('Result', { scanRecord: scanRecord as ScanRecord });
    } catch (error) {
      console.error('Processing failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to process image');
      setStatus('Processing failed');
    }
  };

  const generateThumbnail = async (uri: string): Promise<string> => {
    // For now, just return the original URI
    // TODO: Implement proper thumbnail generation when needed
    return uri;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Text 
          style={styles.retry}
          onPress={() => navigation.goBack()}>
          Try Again
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/scanning.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  error: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  retry: {
    marginTop: 20,
    fontSize: 16,
    color: '#2196f3',
    textDecorationLine: 'underline',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});