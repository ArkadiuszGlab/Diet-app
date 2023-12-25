import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
import { storeObjectData } from '../../utils/storageHelper';
import SelectDropdown from 'react-native-select-dropdown';
import foodServices from '../../services/foodServices';
import styles from './styles';

const mealNames = ['Śniadanie', 'Obiad', 'Kolacja'];

export const FoodDetails = ({
  mealName,
  mealCalories,
  mealBarcode,
  mealProteins,
  mealCarbs,
  mealFats,
  mealId,
  allFoods,
  setAllFoods,
  setBreakfastFoods,
  setLunchFoods,
  setDinnerFoods,
  breakfastFoods,
  lunchFoods,
  dinnerFoods
}) => {
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const [visibilityAdd, setVisibilityAdd] = useState(false);

  const [editedName, setEditedName] = useState(mealName);
  const [editedCalories, setEditedCalories] = useState(`${mealCalories}`);
  const [editedProteins, setEditedProteins] = useState(`${mealProteins}`);
  const [editedCarbs, setEditedCarbs] = useState(`${mealCarbs}`);
  const [editedFats, setEditedFats] = useState(`${mealFats}`);
  const [editedBarcode, setEditedBarcode] = useState(`${mealBarcode}`);
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);
  const [addedWeight, setAddedWeight] = useState('');
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(mealNames[0]);

  const navigation = useNavigation();

  useEffect(() => {
    if (
      editedName.length &&
      editedCalories.length &&
      editedProteins.length &&
      editedCarbs.length &&
      editedFats.length &&
      editedBarcode.length
    )
      setAcceptButtonDisabled(false);
  }, [
    editedName,
    editedCalories,
    editedProteins,
    editedCarbs,
    editedFats,
    editedBarcode
  ]);

  useEffect(() => {
    addedWeight.length > 0 ? setDisabledAdd(false) : setDisabledAdd(true);
  }, [addedWeight]);

  const handleEditCancel = () => {
    setVisibilityEdit(false);
    setEditedName(mealName);
    setEditedCalories(`${mealCalories}`);
    setEditedProteins(`${mealProteins}`);
    setEditedCarbs(`${mealCarbs}`);
    setEditedFats(`${mealFats}`);
    setEditedBarcode(`${mealBarcode}`);
  };
  const handleEditAccept = () => {
    const foodAfterEdit = {
      name: editedName,
      calories: editedCalories,
      proteins: editedProteins,
      carbs: editedCarbs,
      fats: editedFats,
      barcode: editedBarcode
    };

    foodServices
      .update(mealId, foodAfterEdit)
      .then((food) => {
        if (food) {
          newFoodFromApi = food;
          const newFoods = allFoods.map((f) =>
            f._id === mealId ? foodAfterEdit : f
          );
          setAllFoods(newFoods);
        }
      })
      .catch((e) => console.log(e));
    setVisibilityEdit(false);
  };

  const handleDeletePress = () => {
    Alert.alert(`Usuwasz ${mealName}`, 'Na pewno?', [
      {
        text: 'Anuluj',
        onPress: () => console.log('Naciśnięto anuluj'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          foodServices.remove(mealId);
          const newFoods = allFoods.filter((f) => f._id !== mealId);
          setAllFoods(newFoods);
        }
      }
    ]);
  };

  const handleAddPress = () => {
    setVisibilityAdd(true);
  };

  const handleAddAccept = () => {
    var addedFood = {
      name: mealName,
      calories: mealCalories,
      barcode: mealBarcode,
      proteins: mealProteins,
      carbs: mealCarbs,
      fats: mealFats,
      id: mealId,
      date: Date.now(),
      weight: addedWeight
    };
    setAddedWeight('');
    setVisibilityAdd(false);
    if (selectedMeal === 'Śniadanie') {
      const newFoods = breakfastFoods.concat(addedFood);
      setBreakfastFoods(newFoods);
      storeObjectData('breakfastFoods', newFoods);
    }
    if (selectedMeal === 'Obiad') {
      const newFoods = lunchFoods.concat(addedFood);
      setLunchFoods(newFoods);
      storeObjectData('lunchFoods', newFoods);
    }
    if (selectedMeal === 'Kolacja') {
      const newFoods = dinnerFoods.concat(addedFood);
      setDinnerFoods(newFoods);
      storeObjectData('dinnerFoods', newFoods);
    }
    navigation.navigate('Wykresy');
  };

  const handleAddCancel = () => {
    setVisibilityAdd(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={styles.foodText}>
        Białka: {mealProteins}g Węglowodany:{mealCarbs}g Tłuszcze: {mealFats}g
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Pressable
          style={styles.detailsButton}
          onPress={() => setVisibilityEdit(true)}
        >
          <Text style={styles.detailsButtonText}>
            <Icon
              name="edit"
              size={14}
            />
            Edytuj
          </Text>
        </Pressable>
        <Dialog.Container visible={visibilityAdd}>
          <Dialog.Title>Dodajesz {mealName}</Dialog.Title>
          <Text style={{ paddingLeft: 8 }}>Wybierz posiłek:</Text>
          <SelectDropdown
            data={mealNames}
            defaultButtonText={selectedMeal}
            dropdownStyle={styles.selectDropdownStyle}
            rowStyle={styles.selectDropdownRowStyle}
            rowTextStyle={styles.selectDropdownRowTextStyle}
            selectedRowStyle={styles.selectDropdownSelectedRowStyle}
            buttonStyle={styles.selectDropdownButtonStyle}
            buttonTextStyle={styles.selectDropdownButtonTxtStyle}
            onSelect={(selectedItem) => {
              setSelectedMeal(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={addedWeight}
            label="Waga w gramach:"
            onChangeText={(text) => setAddedWeight(text)}
          />
          <Dialog.Button
            label="Anuluj"
            onPress={handleAddCancel}
          />
          <Dialog.Button
            label="OK"
            onPress={handleAddAccept}
            disabled={disabledAdd}
          />
        </Dialog.Container>
        <Dialog.Container visible={visibilityEdit}>
          <Dialog.Title>Edytujesz jedzenie</Dialog.Title>
          <Dialog.Description>
            Podaj wartości dla 100 gramów produktu
          </Dialog.Description>
          <Dialog.Input
            value={editedName}
            label="Nazwa:"
            onChangeText={(text) => setEditedName(text)}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={editedCalories}
            label="Kalorie:"
            onChangeText={(text) => setEditedCalories(text)}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={editedProteins}
            label="Białka:"
            onChangeText={(text) => setEditedProteins(text)}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={editedCarbs}
            label="Węglowodany:"
            onChangeText={(text) => setEditedCarbs(text)}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={editedFats}
            label="Tłuszcze:"
            onChangeText={(text) => setEditedFats(text)}
          />
          <Dialog.Input
            keyboardType="numeric"
            value={editedBarcode}
            label="Kod kreskowy:"
            onChangeText={(text) => setEditedBarcode(text)}
          />
          <Dialog.Button
            label="Anuluj"
            onPress={handleEditCancel}
          />
          <Dialog.Button
            label="OK"
            onPress={handleEditAccept}
            disabled={acceptButtonDisabled}
          />
        </Dialog.Container>

        <Pressable
          style={{ ...styles.detailsButton, backgroundColor: '#7ef8c5' }}
          onPress={handleAddPress}
        >
          <Text style={styles.detailsButtonText}>
            <Icon
              name="plus"
              size={14}
            />
            Zjedzono
          </Text>
        </Pressable>
        <Pressable
          style={{ ...styles.detailsButton, backgroundColor: '#dd0000' }}
          onPress={handleDeletePress}
        >
          <Text style={styles.detailsButtonText}>
            <Icon
              name="delete"
              size={14}
            />
            Usuń
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FoodDetails;
