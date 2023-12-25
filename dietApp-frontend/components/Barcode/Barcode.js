import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(true);
    });
    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('Lista produktów', { barcode: data });
  };

  if (hasPermission === null) {
    return <Text>Prośba o dostęp do kamery</Text>;
  }
  if (hasPermission === false) {
    return <Text>Brak dostępu do kamery</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}

      {scanned && (
        <Button
          title={'Naciśnij aby zeskanować kod'}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};

export default Barcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
