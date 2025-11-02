import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  totalScans: number;
  averageScore: number;
  sustainableChoices: number;
  improvementRate: number;
}

export const MetricsCard: React.FC<Props> = ({
  totalScans,
  averageScore,
  sustainableChoices,
  improvementRate,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#8BC34A';
    if (score >= 40) return '#FFC107';
    return '#F44336';
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}
    >
      <Text style={styles.title}>Your Impact</Text>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{totalScans}</Text>
          <Text style={styles.metricLabel}>Total Scans</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={[
            styles.metricValue,
            { color: getScoreColor(averageScore) }
          ]}>
            {averageScore.toFixed(1)}
          </Text>
          <Text style={styles.metricLabel}>Avg. Score</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{sustainableChoices}</Text>
          <Text style={styles.metricLabel}>Sustainable Choices</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={[
            styles.metricValue,
            { color: improvementRate >= 0 ? '#4CAF50' : '#F44336' }
          ]}>
            {improvementRate > 0 ? '+' : ''}{improvementRate}%
          </Text>
          <Text style={styles.metricLabel}>Improvement</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
});