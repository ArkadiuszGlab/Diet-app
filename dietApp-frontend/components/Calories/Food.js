import { Text, View, Pressable } from 'react-native';

import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storeObjectData } from '../../utils/storageHelper';
import styles from './styles';

export const Food = ({
  name,
  weight,
  calories,
  proteins,
  carbs,
  fats,
  foods,
  setFoods,
  date,
  mealName
}) => {
  const handleDeleteMeal = () => {
    const newFoods = foods.filter((f) => f.date !== date);
    setFoods(newFoods);
    mealName === 'Śniadanie'
      ? storeObjectData('breakfastFoods', newFoods)
      : mealName === 'Obiad'
      ? storeObjectData('lunchFoods', newFoods)
      : storeObjectData('dinnerFoods', newFoods);
  };

  return (
    <View style={styles.foodRow}>
      <Text
        style={{
          ...styles.foodText,
          borderBottomWidth: 0
        }}
      >
        {name}{' '}
      </Text>
      <Text style={styles.foodText}>
        {weight}g {calories}kcal B: {proteins}g W: {carbs}g T: {fats}g
      </Text>
      <Pressable
        style={{ flexDirection: 'row' }}
        onPress={handleDeleteMeal}
      >
        <Text style={styles.foodText}>Usuń:</Text>
        <MUIcon
          name="delete-circle"
          size={23}
          color={'#ff0000'}
        />
      </Pressable>
    </View>
  );
};

export default Food;
