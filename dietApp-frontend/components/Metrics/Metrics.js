import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Dialog from 'react-native-dialog';
import {
  storeData,
  storeObjectData,
  getData,
  getObjectData
} from '../../utils/storageHelper';
import styles from './styles';

const typesOfBmi = [
  'niedowaga',
  'waga prawidłowa',
  'nadwaga',
  'I stopień otyłości',
  'II stopień otyłości'
];

const RadioButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 5
        },
        props.style
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000'
          }}
        />
      ) : null}
    </Pressable>
  );
};

export const Metrics = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [caloriesTotal, setCaloriesTotal] = useState('');
  const [proteinsTotal, setProteinsTotal] = useState('');
  const [carbsTotal, setCarbsTotal] = useState('');
  const [fatsTotal, setFatsTotal] = useState('');

  const [bmi, setBmi] = useState(0);

  const [ageDependency, setAgeDependency] = useState(0);

  const [genderValue, setGenderValue] = useState(0);

  const [bmr, setBmr] = useState(0);

  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const [visibleCalDial, setVisibleCalDial] = useState(false);
  const [visibleMacroDial, setVisibleMacroDial] = useState(false);

  const [chosenCalories, setChosenCalories] = useState('');

  const [chosenProtein, setChosenProtein] = useState('');
  const [chosenCarbs, setChosenCarbs] = useState('');
  const [chosenFats, setChosenFats] = useState('');

  const [loading, setLoading] = useState(true);

  const showCalDialog = () => {
    setVisibleCalDial(true);
  };

  const handleCalDialCancel = () => {
    setChosenCalories(`${caloriesTotal}`);
    setVisibleCalDial(false);
  };

  const handleCalDialAccept = () => {
    setCaloriesTotal(chosenCalories);
    storeObjectData('acceptedCalories', chosenCalories);
    setVisibleCalDial(false);
  };

  const showMacroDial = () => {
    setVisibleMacroDial(true);
  };

  const handleMacroDialAccept = () => {
    setProteinsTotal(chosenProtein);
    setCarbsTotal(chosenCarbs);
    setFatsTotal(chosenFats);
    storeObjectData('acceptedCarbs', calculatedCarbs);
    storeObjectData('acceptedFats', calculatedFats);
    storeObjectData('acceptedProteins', calculatedProteins);
    setVisibleMacroDial(false);
  };

  const handleMacroDialCancel = () => {
    setProteinsTotal(proteinsTotal);
    setCarbsTotal(carbsTotal);
    setFatsTotal(fatsTotal);
    setVisibleMacroDial(false);
  };

  const goals = ['schudnąć', 'utrzymać wagę', 'przytyć'];

  const caloricValues = [-300, 0, 300];

  const activities = [
    'siedząca, brak aktywności',
    'siedząca i 1-2',
    'siedząca i 3-4',
    'fizyczna i 3-4',
    'codzienne ćwiczenia'
  ];

  const activityValue = [1.2, 1.375, 1.55, 1.725, 1.9];

  const calculatedProteins = Math.ceil((Number(caloriesTotal) * 0.2) / 4);
  const calculatedCarbs = Math.ceil((Number(caloriesTotal) * 0.5) / 4);
  const calculatedFats = Math.ceil((Number(caloriesTotal) * 0.3) / 9);

  const getStorageValues = () => {
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
    });
    getObjectData('gender').then((value) =>
      value !== null ? setSelectedGender(value) : setSelectedGender('K')
    );
    getData('height').then((value) =>
      value !== null ? setHeight(value) : setHeight('0')
    );
    getData('weight').then((value) =>
      value !== null ? setWeight(value) : setWeight('0')
    );
    getData('age').then((value) =>
      value !== null ? setAge(value) : setAge('0')
    );
    getObjectData('selectedActivity').then((value) => {
      value !== null ? setSelectedActivity(value) : setSelectedActivity(null);
    });
    getObjectData('selectedGoal').then((value) => {
      value !== null ? setSelectedGoal(value) : setSelectedGoal('');
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getStorageValues();
  }, []);

  useEffect(() => {
    var ageValue =
      age < 25
        ? 0
        : age < 35
        ? 1
        : age < 45
        ? 2
        : age < 55
        ? 3
        : age < 65
        ? 4
        : 5;
    setAgeDependency(ageValue);
  }, [age]);

  useEffect(() => {
    selectedGender === 'K' ? setGenderValue(1) : setGenderValue(0);
  }, [selectedGender]);

  useEffect(() => {
    weight <= 200 && weight >= 1 && height >= 46 && height <= 273
      ? setBmi(
          Number(
            Math.round(
              Number(weight) / Math.pow(Number(height) / 100, 2) + 'e+2'
            ) + 'e-2'
          )
        )
      : setBmi('0');
    var bmrValue =
      genderValue === 1
        ? 655.1 +
          9.563 * Number(weight) +
          (1.85 * Number(height) - 4.676 * Number(age))
        : 66.5 +
          13.75 * Number(weight) +
          5.0003 * Number(height) -
          6.775 * Number(age);
    bmrValue = Math.round(bmrValue);
    setBmr(bmrValue);
  }, [age, genderValue, weight, height]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.box}>
            <View style={styles.row}>
              <View style={styles.inputs}>
                <View style={styles.row}>
                  <Text style={styles.text}>Płeć:</Text>
                  <RadioButton
                    selected={selectedGender === 'K' ? 1 : 0}
                    onPress={() => {
                      setSelectedGender('K');
                      storeObjectData('gender', 'K');
                    }}
                  />
                  <Text style={styles.text}>K</Text>
                  <RadioButton
                    selected={selectedGender === 'M' ? 1 : 0}
                    onPress={() => {
                      setSelectedGender('M');
                      storeObjectData('gender', 'M');
                    }}
                  />
                  <Text style={styles.text}>M</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Wiek:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setAge(text);
                      storeData('age', text);
                    }}
                    value={age}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Waga:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setWeight(text);
                      storeData('weight', text);
                    }}
                    value={weight}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Wzrost:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      setHeight(text);
                      storeData('height', text);
                    }}
                    value={height}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>
              {bmi === 'nieprawidłowe dane' ? bmi : 'BMI:'}
            </Text>
            <Text style={{ ...styles.text, fontSize: 35, color: '#fff' }}>
              {bmi}
            </Text>
            <Text style={{ ...styles.text, fontSize: 20, color: '#000' }}>
              {bmi === 'nieprawidłowe dane'
                ? ''
                : Number(bmi) < 20 + ageDependency - genderValue
                ? typesOfBmi[0]
                : Number(bmi) < 25 + ageDependency - genderValue
                ? typesOfBmi[1]
                : Number(bmi) < 30 + ageDependency - genderValue
                ? typesOfBmi[2]
                : Number(bmi) < 40 + ageDependency - genderValue
                ? typesOfBmi[3]
                : typesOfBmi[4]}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, width: 340, height: 210 }}>
          <Text style={styles.text}>
            Rodzaj pracy i ilość treningów tygodniowo:
          </Text>
          <SelectDropdown
            data={activities}
            defaultButtonText={
              selectedActivity !== '' && selectedActivity !== null
                ? activities[selectedActivity]
                : 'Przyciśnij aby wybrać'
            }
            dropdownStyle={styles.selectDropdownStyle}
            rowStyle={styles.selectDropdownRowStyle}
            rowTextStyle={styles.selectDropdownRowTextStyle}
            selectedRowStyle={styles.selectDropdownSelectedRowStyle}
            buttonStyle={styles.selectDropdownButtonStyle}
            buttonTextStyle={styles.selectDropdownButtonTxtStyle}
            onSelect={(selectedItem, index) => {
              setSelectedActivity(index);
              storeObjectData('selectedActivity', index);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
          />
          <Text style={styles.text}>Co chcesz zrobić ze swoją wagą:</Text>
          <SelectDropdown
            data={goals}
            defaultButtonText={
              selectedGoal !== '' ? goals[selectedGoal] : 'Wybierz swój cel'
            }
            dropdownStyle={styles.selectDropdownStyle}
            rowStyle={styles.selectDropdownRowStyle}
            rowTextStyle={styles.selectDropdownRowTextStyle}
            selectedRowStyle={styles.selectDropdownSelectedRowStyle}
            buttonStyle={styles.selectDropdownButtonStyle}
            buttonTextStyle={styles.selectDropdownButtonTxtStyle}
            onSelect={(selectedItem, index) => {
              setSelectedGoal(index);
              storeObjectData('selectedGoal', index);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
          />
        </View>
        <View style={{ ...styles.box, width: 340, height: 700 }}>
          <Text style={styles.text}>
            Proponowana ilość spożywanych kalorii:
          </Text>
          <Text style={{ ...styles.text, fontSize: 35, color: '#fff' }}>
            {selectedActivity !== '' && selectedGoal !== ''
              ? Math.round(bmr * activityValue[selectedActivity]) +
                caloricValues[Number(selectedGoal)]
              : '0'}
          </Text>
          <Text style={styles.text}>
            Czy chcesz ustawić taką ilość kalorii?
          </Text>
          <View style={styles.row}>
            <Pressable
              style={styles.button}
              onPress={() => {
                const newCalories =
                  Math.round(bmr * activityValue[selectedActivity]) +
                  caloricValues[selectedGoal];
                setCaloriesTotal(newCalories);
                storeObjectData('acceptedCalories', newCalories);
              }}
            >
              <Text style={styles.text}>Tak</Text>
            </Pressable>
            <Pressable
              onPress={showCalDialog}
              style={styles.button}
            >
              <Text style={styles.text}>Wybierz inną</Text>
            </Pressable>
            <Dialog.Container visible={visibleCalDial}>
              <Dialog.Title>Wybór ilości kalorii</Dialog.Title>
              <Dialog.Description>
                Wpisz ile kalorii chcesz spożywać
              </Dialog.Description>
              <Dialog.Input
                keyboardType="numeric"
                value={chosenCalories}
                onChangeText={(text) => setChosenCalories(text)}
              />
              <Dialog.Button
                label="Anuluj"
                onPress={handleCalDialCancel}
              />
              <Dialog.Button
                label="OK"
                onPress={handleCalDialAccept}
              />
            </Dialog.Container>
          </View>
          <Text style={styles.text}>Obecnie wybrana ilość kalorii:</Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 35 }}>
            {caloriesTotal.length === 0 ? 'nie wybrano' : caloriesTotal}
          </Text>
          <Text style={styles.text}>
            Proponowana gramatura makroskładników względem wybranej ilości
            kalorii:
          </Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Białko: {calculatedProteins}g
          </Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Węglowodany: {calculatedCarbs}g
          </Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Tłuszcze: {calculatedFats}g
          </Text>
          <Text style={styles.text}>Czy chcesz ustawić taką gramature?</Text>
          <View style={styles.row}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setCarbsTotal(calculatedCarbs);
                setFatsTotal(calculatedFats);
                setProteinsTotal(calculatedProteins);
                storeObjectData('acceptedCarbs', calculatedCarbs);
                storeObjectData('acceptedFats', calculatedFats);
                storeObjectData('acceptedProteins', calculatedProteins);
              }}
            >
              <Text style={styles.text}>Tak</Text>
            </Pressable>

            <Pressable
              onPress={showMacroDial}
              style={styles.button}
            >
              <Text style={styles.text}>Wybierz inną</Text>
            </Pressable>
            <Dialog.Container visible={visibleMacroDial}>
              <Dialog.Title>Wybór gramatur makroskładników</Dialog.Title>
              <Dialog.Input
                keyboardType="numeric"
                value={chosenProtein}
                onChangeText={(text) => setChosenProtein(text)}
                label="Białko"
              />

              <Dialog.Input
                keyboardType="numeric"
                value={chosenCarbs}
                onChangeText={(text) => setChosenCarbs(text)}
                label="Węglowodany"
              />

              <Dialog.Input
                keyboardType="numeric"
                value={chosenFats}
                onChangeText={(text) => setChosenFats(text)}
                label="Tłuszcze"
              />
              <Dialog.Button
                label="Anuluj"
                onPress={handleMacroDialCancel}
              />
              <Dialog.Button
                label="OK"
                onPress={handleMacroDialAccept}
              />
            </Dialog.Container>
          </View>
          <Text style={styles.text}>Obecnie wybrana gramatura:</Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Białko: {proteinsTotal ? `${proteinsTotal}g` : 'nie wybrano'}
          </Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Węglowodany: {carbsTotal ? `${carbsTotal}g` : 'nie wybrano'}
          </Text>
          <Text style={{ ...styles.text, color: '#fff', fontSize: 27 }}>
            Tłuszcze: {fatsTotal ? `${fatsTotal}g` : 'nie wybrano'}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.text}>Podstawowa przemiana materii:</Text>
            <Text style={{ ...styles.text, fontSize: 35, color: '#fff' }}>
              {weight === '0' && height === '0' && age === '0' ? '0' : bmr}
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>
              Całkowite zapotrzebowanie kaloryczne:
            </Text>
            <Text style={{ ...styles.text, color: '#fff', fontSize: 35 }}>
              {selectedActivity !== null
                ? Math.round(bmr * activityValue[selectedActivity])
                : 'uzupełnij dane'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Metrics;
