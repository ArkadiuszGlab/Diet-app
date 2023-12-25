import { Text, View } from 'react-native';

import ProgressArc from './ProgressArc';

import styles from './styles';

export const ArcContainer = ({
  caloriesPercentage,
  handleRandomize,
  caloriesLeft,
  caloriesConsumed,
  caloriesTotal
}) => {
  return (
    <View
      style={styles.arcContainer}
      id="arcContainer"
    >
      <ProgressArc
        percentage={caloriesPercentage}
        handleRandomize={handleRandomize}
      />
      <View style={styles.caloriesColumn}>
        <Text style={styles.topText}>{caloriesLeft} kcal</Text>
        <Text style={styles.botTextArc}>zostało</Text>
        <Text style={styles.topText}>{caloriesConsumed} kcal</Text>
        <Text style={styles.botTextArc}>zjedzono</Text>
        <Text style={styles.topText}>{caloriesTotal} kcal</Text>
        <Text style={styles.botTextArc}>wszystkich</Text>
      </View>
    </View>
  );
};

export default ArcContainer;
