import React, { useState } from 'react';

import { Pressable, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

import FoodDetails from './FoodDetails';

export const Food = ({
  mealId,
  mealName,
  mealCalories,
  mealProteins,
  mealCarbs,
  mealFats,
  mealBarcode,
  allFoods,
  setAllFoods,
  setBreakfastFoods,
  setLunchFoods,
  setDinnerFoods,
  breakfastFoods,
  lunchFoods,
  dinnerFoods
}) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.mealContainer}>
        <Pressable
          style={styles.mealButton}
          onPress={() => setVisibility(!visibility)}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
            {mealName}: {mealCalories}kcal/100g
          </Text>
          {visibility ? (
            <Icon
              name="caretup"
              color={'#d4f2e5'}
              size={17}
            />
          ) : (
            <Icon
              name="caretdown"
              color={'#d4f2e5'}
              size={17}
            />
          )}
        </Pressable>
        {visibility ? (
          <FoodDetails
            {...{
              mealId,
              mealName,
              mealBarcode,
              mealCalories,
              mealProteins,
              mealCarbs,
              mealFats,
              setAllFoods,
              allFoods,
              setBreakfastFoods,
              setLunchFoods,
              setDinnerFoods,
              breakfastFoods,
              lunchFoods,
              dinnerFoods
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Food;
