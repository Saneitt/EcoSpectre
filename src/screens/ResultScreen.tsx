import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ResultCard } from '../components/ResultCard';
import { useAuth } from '../store/auth';
import { api } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { scanRecord } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const userId = useAuth(state => state.user?.id);

  const handleAction = async (action: 'consume' | 'reject') => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      // Log the scan to MongoDB with the correct action type
      await api.createScan(
        scanRecord.context,
        scanRecord.score,
        action === 'consume' ? 'consumed' : 'rejected'
      );
      
      // Navigate back to the scan screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to save your action. Please try again.',
        [
          {
            text: 'Retry',
            onPress: () => handleAction(action),
          },
          {
            text: 'Cancel',
            onPress: () => {
              // Navigate anyway - we don't want to block the user
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            },
            style: 'cancel',
          },
        ],
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!scanRecord) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ResultCard
        score={scanRecord.score}
        context={scanRecord.context}
        onAction={handleAction}
        disabled={isProcessing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
});