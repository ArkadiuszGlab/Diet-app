import { Text, View } from 'react-native';

import ProgressBar from './ProgressBar';

import styles from './styles';

export const MacroContainer = ({
  proteinPercentage,
  handleRandomize,
  proteinCurrent,
  proteinsTotal,
  carbsCurrent,
  carbsTotal,
  fatsCurrent,
  fatsTotal,
  carbsPercentage,
  fatsPercentage
}) => {
  return (
    <View>
      <View style={styles.row}>
        <ProgressBar
          percentage={proteinPercentage}
          handleRandomize={handleRandomize}
        />
        <View style={styles.caloriesColumn}>
          <Text style={styles.topText}>Białka</Text>
          <Text style={styles.botTextProgress}>
            {proteinCurrent}/{proteinsTotal} g
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <ProgressBar percentage={carbsPercentage} />
        <View style={styles.caloriesColumn}>
          <Text style={styles.topText}>Węglowodany</Text>
          <Text style={styles.botTextProgress}>
            {carbsCurrent}/{carbsTotal} g
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <ProgressBar percentage={fatsPercentage} />
        <View style={styles.caloriesColumn}>
          <Text style={styles.topText}>Tłuszcze</Text>
          <Text style={styles.botTextProgress}>
            {fatsCurrent}/{fatsTotal} g
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MacroContainer;
