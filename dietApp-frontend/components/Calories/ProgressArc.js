import React, { useRef, useEffect } from 'react';
import { Text, Dimensions, Animated, View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

var { width } = Dimensions.get('window');
width = width / 2;
const size = width - 32;
const strokeWidth = 25;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const { PI, cos, sin } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const A = PI + PI * 0.4;
const startAngle = PI + PI * 0.2;
const endAngle = 2 * PI - PI * 0.2;
const x1 = cx - r * cos(startAngle);
const y1 = -r * sin(startAngle) + cy;
const x2 = cx - r * cos(endAngle);
const y2 = -r * sin(endAngle) + cy;
const d = `M ${x2} ${y2} A ${r} ${r} 0 1 1 ${x1} ${y1}`;

export const ProgressArc = ({ percentage }) => {
  const circumference = r * A;
  const translation = useRef(new Animated.Value(0)).current;

  const strokeDashoffset = translation;

  useEffect(() => {
    Animated.timing(translation, {
      toValue:
        percentage <= 100 ? (circumference * (100 - percentage)) / 100 : 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg
        width={size}
        height={size}
      >
        <Path
          d={d}
          stroke="#d4f2e5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={'none'}
        />
        <AnimatedPath
          stroke={percentage <= 100 ? '#6bd2a7' : '#dd0000'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{ d, strokeDashoffset, strokeWidth }}
        />
      </Svg>
      <View style={styles.button}>
        <Text style={styles.insideGraphText}>{Math.ceil(percentage)}%</Text>
        <Text style={{ opacity: 0.4 }}>celu dziennego</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  },
  button: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center'
  },
  insideGraphText: { fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }
});

export default ProgressArc;
