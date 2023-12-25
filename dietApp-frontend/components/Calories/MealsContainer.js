import { useEffect } from 'react';
import { View } from 'react-native';

import Meal from './Meal';

import styles from './styles';

export const MealsContainer = ({
  navigation,
  breakfastCalories,
  lunchCalories,
  dinnerCalories,
  setBreakfastCalories,
  setLunchCalories,
  setDinnerCalories,
  setProteinCurrent,
  setCarbsCurrent,
  setFatsCurrent,
  breakfastFoods,
  lunchFoods,
  dinnerFoods,
  setBreakfastFoods,
  setLunchFoods,
  setDinnerFoods
}) => {
  useEffect(() => {
    var breakfastCaloriesCurrent = 0;
    var lunchCaloriesCurrent = 0;
    var dinnerCaloriesCurrent = 0;
    var proteinsCombined = 0;
    var carbsCombined = 0;
    var fatsCombined = 0;

    if (breakfastFoods.length)
      breakfastFoods.forEach((food) => {
        breakfastCaloriesCurrent =
          breakfastCaloriesCurrent + food.calories * (food.weight / 100);
        proteinsCombined =
          proteinsCombined + food.proteins * (food.weight / 100);
        carbsCombined = carbsCombined + food.carbs * (food.weight / 100);
        fatsCombined = fatsCombined + food.fats * (food.weight / 100);
      });
    if (lunchFoods.length)
      lunchFoods.forEach((food) => {
        lunchCaloriesCurrent =
          lunchCaloriesCurrent + food.calories * (food.weight / 100);
        proteinsCombined =
          proteinsCombined + food.proteins * (food.weight / 100);
        carbsCombined = carbsCombined + food.carbs * (food.weight / 100);
        fatsCombined = fatsCombined + food.fats * (food.weight / 100);
      });
    if (dinnerFoods.length)
      dinnerFoods.forEach((food) => {
        dinnerCaloriesCurrent =
          dinnerCaloriesCurrent + food.calories * (food.weight / 100);
        proteinsCombined =
          proteinsCombined + food.proteins * (food.weight / 100);
        carbsCombined = carbsCombined + food.carbs * (food.weight / 100);
        fatsCombined = fatsCombined + food.fats * (food.weight / 100);
      });

    breakfastCaloriesCurrent = Math.ceil(breakfastCaloriesCurrent);
    lunchCaloriesCurrent = Math.ceil(lunchCaloriesCurrent);
    dinnerCaloriesCurrent = Math.ceil(dinnerCaloriesCurrent);
    proteinsCombined = Math.ceil(proteinsCombined);
    carbsCombined = Math.ceil(carbsCombined);
    fatsCombined = Math.ceil(fatsCombined);

    setBreakfastCalories(breakfastCaloriesCurrent);
    setLunchCalories(lunchCaloriesCurrent);
    setDinnerCalories(dinnerCaloriesCurrent);
    setProteinCurrent(proteinsCombined);
    setCarbsCurrent(carbsCombined);
    setFatsCurrent(fatsCombined);
  }, [breakfastFoods, lunchFoods, dinnerFoods]);

  return (
    <View style={styles.container}>
      <Meal
        mealName="Śniadanie"
        mealCalories={breakfastCalories}
        foods={breakfastFoods}
        navigation={navigation}
        setFoods={setBreakfastFoods}
      />
      <Meal
        mealName="Obiad"
        mealCalories={lunchCalories}
        foods={lunchFoods}
        navigation={navigation}
        setFoods={setLunchFoods}
      />
      <Meal
        mealName="Kolacja"
        mealCalories={dinnerCalories}
        foods={dinnerFoods}
        navigation={navigation}
        setFoods={setDinnerFoods}
      />
    </View>
  );
};

export default MealsContainer;
