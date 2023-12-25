import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, value);
  } catch (e) {
    console.log(e);
  }
};

export const storeObjectData = async (item, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);

    if (value !== null) {
      return value;
    } else return null;
  } catch (e) {
    console.log(e);
  }
};

export const getObjectData = async (item) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
