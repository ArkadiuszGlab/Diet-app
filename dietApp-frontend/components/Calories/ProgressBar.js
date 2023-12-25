import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Svg, Line, G, Text } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export const ProgressBar = ({ percentage }) => {
  const translation = useRef(new Animated.Value(25)).current;

  const newX2 = translation;

  const width = 200;
  const height = 50;
  const strokeWidth = 25;
  const x1 = strokeWidth;
  const x2 = width - strokeWidth;
  const barWidth = width - 2 * strokeWidth;

  const y1 = height / 2;

  useEffect(() => {
    Animated.timing(translation, {
      toValue:
        percentage <= 100
          ? (barWidth * percentage) / 100 + strokeWidth
          : barWidth + strokeWidth,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, [percentage]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Svg
        height={height}
        width={width}
        style={styles.svg}
      >
        <G>
          <Line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y1}
            stroke="#d4f2e5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {percentage ? (
            <AnimatedLine
              x1={x1}
              y1={y1}
              x2={newX2}
              y2={y1}
              stroke={percentage <= 100 ? '#6bd2a7' : '#dd0000'}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ) : null}
          <Text
            style={styles.text}
            x={(barWidth + 25) / 2}
            y={strokeWidth + 5}
          >
            {Math.ceil(percentage)}%
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});

export default ProgressBar;
