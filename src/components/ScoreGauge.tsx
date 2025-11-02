import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
}

export const ScoreGauge: React.FC<Props> = ({
  score,
  size = 200,
  strokeWidth = 15,
  duration = 1500,
}) => {
  const progress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate color based on score
  const getColor = (value: number) => {
    if (value >= 80) return '#4CAF50';
    if (value >= 60) return '#8BC34A';
    if (value >= 40) return '#FFC107';
    return '#F44336';
  };

  useEffect(() => {
    progress.value = withTiming(score / 100, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [score]);

  const displayScore = useDerivedValue(() => {
    return Math.round(progress.value * 100);
  });

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
      stroke: getColor(progress.value * 100),
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          animatedProps={animatedProps}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
        {/* Score text */}
        <SvgText
          x={size / 2}
          y={size / 2}
          fontSize="40"
          fontWeight="bold"
          fill="#333"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {displayScore.value}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotateZ: '0deg' }],
  },
});