import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import Food from './Food';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export const Meal = ({
  navigation,
  mealName,
  mealCalories,
  foods,
  setFoods
}) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.mealContainer}>
        <Pressable
          style={styles.mealButton}
          onPress={() => setVisibility(!visibility)}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
            {mealName}: {mealCalories}
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

        {visibility
          ? foods.map(
              ({ name, weight, calories, proteins, carbs, fats, id, date }) => (
                <Food
                  key={`${mealName}-${date}`}
                  {...{
                    mealName,
                    name,
                    date,
                    weight,
                    calories,
                    proteins,
                    carbs,
                    fats,
                    foods,
                    setFoods
                  }}
                />
              )
            )
          : null}
        {visibility ? (
          <Pressable style={styles.addFoodButton}>
            <Text
              style={{ color: '#6bd2a7', fontSize: 14, fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Lista produktów')}
            >
              Dodaj jedzenie{' '}
            </Text>
            <Icon
              name="plus"
              size={15}
              color="#6bd2a7"
              fontWeight="bold"
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default Meal;
