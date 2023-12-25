import React, { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
import { getObjectData } from '../../utils/storageHelper';

import Food from './Food';

import foodServices from '../../services/foodServices';
import styles from './styles';

export const Foods = ({ route, navigation }) => {
  const [searchedFoodName, setSearchedFoodName] = useState('');
  const [allFoods, setAllFoods] = useState([]);
  const [visibleFoods, setVisibleFoods] = useState([]);
  const [showAddNewFoodDialog, setShowAddNewFoodDialog] = useState(false);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCalories, setNewFoodCalories] = useState('');
  const [newFoodProteins, setNewFoodProteins] = useState('');
  const [newFoodCarbs, setNewFoodCarbs] = useState('');
  const [newFoodFats, setNewFoodFats] = useState('');
  const [newFoodBarcode, setNewFoodBarcode] = useState('');
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);

  const [breakfastFoods, setBreakfastFoods] = useState([]);
  const [lunchFoods, setLunchFoods] = useState([]);
  const [dinnerFoods, setDinnerFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    foodServices
      .getAll()
      .then((foods) => setAllFoods(foods))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    var newBarcode = '';
    if (route.params) {
      console.log(route.params.barcode);
      const { barcode } = route.params;
      if (barcode) newBarcode = barcode;
      setSearchedFoodName(newBarcode);
      setNewFoodBarcode(newBarcode);
    }
  }, [route]);

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
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      makeStorageCall();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (
      newFoodName.length &&
      newFoodCalories.length &&
      newFoodProteins.length &&
      newFoodCarbs.length &&
      newFoodFats.length
    )
      setAcceptButtonDisabled(false);
  }, [
    newFoodName,
    newFoodCalories,
    newFoodProteins,
    newFoodCarbs,
    newFoodFats,
    newFoodBarcode
  ]);

  useEffect(() => {
    var newFoods = allFoods;
    if (searchedFoodName)
      var newFoods = allFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchedFoodName.toLowerCase()) ||
          food.barcode.includes(searchedFoodName)
      );
    setVisibleFoods(newFoods);
  }, [searchedFoodName, allFoods]);

  const handleNewFoodAccept = () => {
    const newFoodToSave = {
      name: newFoodName,
      calories: newFoodCalories,
      proteins: newFoodProteins,
      carbs: newFoodCarbs,
      fats: newFoodFats,
      barcode: newFoodBarcode
    };
    var newFoodFromApi = {};
    foodServices.create(newFoodToSave).then((food) => {
      if (food) {
        newFoodFromApi = food;
        const newFoods = allFoods.concat(newFoodFromApi);
        setAllFoods(newFoods);
      }
    });

    setShowAddNewFoodDialog(false);
  };

  const handleNewFoodCancel = () => {
    setShowAddNewFoodDialog(false);
    setNewFoodName('');
    setNewFoodCalories('');
    setNewFoodProteins('');
    setNewFoodCarbs('');
    setNewFoodFats('');
    setNewFoodBarcode('');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.searchBar}>
            <AntIcon
              name="search1"
              size={15}
            />
            <TextInput
              value={searchedFoodName}
              onChangeText={setSearchedFoodName}
              placeholder="Wpisz nazwę jedzenia lub podaj kod kreskowy"
            />
          </View>
          <Pressable
            style={styles.addNewFoodButton}
            onPress={() => setShowAddNewFoodDialog(true)}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
              Dodaj nowe jedzenie{' '}
            </Text>
            <Icon
              name="pluscircle"
              size={16}
              color={'#fff'}
            />
          </Pressable>
          <Dialog.Container visible={showAddNewFoodDialog}>
            <Dialog.Description>
              Podaj wartości dla 100 gramów produktu
            </Dialog.Description>
            <Dialog.Title>Dodaj nowe jedzenie</Dialog.Title>
            <Dialog.Input
              value={newFoodName}
              label="Nazwa:"
              onChangeText={(text) => setNewFoodName(text)}
            />
            <Dialog.Input
              keyboardType="numeric"
              value={newFoodCalories}
              label="Kalorie:"
              onChangeText={(text) => setNewFoodCalories(text)}
            />
            <Dialog.Input
              keyboardType="numeric"
              value={newFoodProteins}
              label="Białka:"
              onChangeText={(text) => setNewFoodProteins(text)}
            />
            <Dialog.Input
              keyboardType="numeric"
              value={newFoodCarbs}
              label="Węglowodany:"
              onChangeText={(text) => setNewFoodCarbs(text)}
            />
            <Dialog.Input
              keyboardType="numeric"
              value={newFoodFats}
              label="Tłuszcze:"
              onChangeText={(text) => setNewFoodFats(text)}
            />
            <Dialog.Input
              keyboardType="numeric"
              value={newFoodBarcode}
              label="Kod kreskowy:"
              onChangeText={(text) => setNewFoodBarcode(text)}
            />
            <Dialog.Button
              label="Anuluj"
              onPress={handleNewFoodCancel}
            />
            <Dialog.Button
              label="OK"
              onPress={handleNewFoodAccept}
              disabled={acceptButtonDisabled}
            />
          </Dialog.Container>
          {allFoods.length > 0 ? (
            visibleFoods.map((f) => (
              <Food
                key={f._id}
                mealName={f.name}
                mealCalories={f.calories}
                mealProteins={f.proteins}
                mealCarbs={f.carbs}
                mealFats={f.fats}
                mealBarcode={f.barcode}
                mealId={f._id}
                {...{
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
            ))
          ) : (
            <Text>brak danych</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Foods;
