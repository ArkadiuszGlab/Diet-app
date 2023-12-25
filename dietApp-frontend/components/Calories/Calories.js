import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import DataMissing from './DataMissing';
import MealsContainer from './MealsContainer';
import ArcContainer from './ArcContainer';
import MacroContainer from './MacroContainer';

import { getObjectData, storeObjectData } from '../../utils/storageHelper';
import styles from './styles';

export const Calories = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [breakfastCalories, setBreakfastCalories] = useState(0);
  const [lunchCalories, setLunchCalories] = useState(0);
  const [dinnerCalories, setDinnerCalories] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState('');
  const [proteinsTotal, setProteinsTotal] = useState('');
  const [carbsTotal, setCarbsTotal] = useState('');
  const [fatsTotal, setFatsTotal] = useState('');

  const [breakfastFoods, setBreakfastFoods] = useState([]);
  const [lunchFoods, setLunchFoods] = useState([]);
  const [dinnerFoods, setDinnerFoods] = useState([]);

  const [caloriesConsumed, setCaloriesConsumed] = useState(
    breakfastCalories + lunchCalories + dinnerCalories
  );
  const [caloriesLeft, setCaloriesLeft] = useState(
    caloriesTotal - caloriesConsumed
  );

  const [caloriesPercentage, setCaloriesPercentage] = useState(
    Math.ceil((caloriesConsumed / caloriesTotal) * 100)
  );
  const [proteinCurrent, setProteinCurrent] = useState(0);
  const [carbsCurrent, setCarbsCurrent] = useState(0);
  const [fatsCurrent, setFatsCurrent] = useState(0);

  const [fatsPercentage, setFatsPercentage] = useState(
    Math.ceil((fatsCurrent / fatsTotal) * 100)
  );
  const [carbsPercentage, setCarbsPercentage] = useState(
    Math.ceil((carbsCurrent / carbsTotal) * 100)
  );
  const [proteinPercentage, setProteinPercentage] = useState(
    Math.ceil((proteinCurrent / proteinsTotal) * 100)
  );

  const makeStorageCall = () => {
    getObjectData('breakfastFoods').then((value) => {
      value !== null ? setBreakfastFoods(value) : setBreakfastFoods([]);
    });
    getObjectData('lunchFoods').then((value) => {
      value !== null ? setLunchFoods(value) : setLunchFoods([]);
    });
    getObjectData('dinnerFoods').then((value) => {
      value !== null ? setDinnerFoods(value) : setDinnerFoods([]);
    });

    getObjectData('acceptedCalories').then((value) => {
      value !== null ? setCaloriesTotal(value) : setCaloriesTotal('');
    });
    getObjectData('acceptedProteins').then((value) => {
      value !== null ? setProteinsTotal(value) : setProteinsTotal('');
    });
    getObjectData('acceptedCarbs').then((value) => {
      value !== null ? setCarbsTotal(value) : setCarbsTotal('');
    });
    getObjectData('acceptedFats').then((value) => {
      value !== null ? setFatsTotal(value) : setFatsTotal('');
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    makeStorageCall();
  }, []);

  useEffect(() => {
    const date = new Date();
    const newTodaysDate = `${date.getDate()}.${date.getMonth()}`;

    getObjectData('previousDate')
      .then((value) => {
        value === null ? (previousDate = '') : (previousDate = value);
      })
      .finally(() => {
        if (newTodaysDate !== previousDate) {
          storeObjectData('breakfastFoods', []);
          storeObjectData('lunchFoods', []);
          storeObjectData('dinnerFoods', []);
        }
        storeObjectData('previousDate', newTodaysDate);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      makeStorageCall();
      setCaloriesLeft(Number(caloriesTotal) - Number(caloriesConsumed));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setCaloriesPercentage(Math.ceil((caloriesConsumed / caloriesTotal) * 100));
  }, [caloriesConsumed, caloriesTotal]);

  useEffect(() => {
    setProteinPercentage(Math.ceil((proteinCurrent / proteinsTotal) * 100));
  }, [proteinCurrent, proteinsTotal]);

  useEffect(() => {
    setCarbsPercentage(Math.ceil((carbsCurrent / carbsTotal) * 100));
  }, [carbsCurrent, carbsTotal]);

  useEffect(() => {
    setFatsPercentage(Math.ceil((fatsCurrent / fatsTotal) * 100));
  }, [fatsCurrent, fatsTotal]);

  useEffect(() => {
    setCaloriesConsumed(breakfastCalories + lunchCalories + dinnerCalories);
  }, [breakfastCalories, lunchCalories, dinnerCalories]);

  useEffect(() => {
    setCaloriesLeft(caloriesTotal - caloriesConsumed);
  }, [caloriesConsumed]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      {caloriesTotal === '' ||
      proteinsTotal === '' ||
      carbsTotal === '' ||
      fatsTotal === '' ? (
        <DataMissing />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <ArcContainer
              {...{
                caloriesPercentage,
                caloriesLeft,
                caloriesConsumed,
                caloriesTotal
              }}
            />
            <MacroContainer
              {...{
                proteinPercentage,
                proteinCurrent,
                proteinsTotal,
                carbsCurrent,
                carbsTotal,
                fatsCurrent,
                fatsTotal,
                carbsPercentage,
                fatsPercentage
              }}
            />
            <MealsContainer
              {...{
                breakfastCalories,
                lunchCalories,
                dinnerCalories,
                setBreakfastCalories,
                setLunchCalories,
                setDinnerCalories,
                setProteinCurrent,
                setCarbsCurrent,
                setFatsCurrent,
                navigation,
                breakfastFoods,
                lunchFoods,
                dinnerFoods,
                setBreakfastFoods,
                setLunchFoods,
                setDinnerFoods
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Calories;
