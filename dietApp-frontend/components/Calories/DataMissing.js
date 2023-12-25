import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

export const DataMissing = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.foodRow}>
      <Text style={{ ...styles.topText, textAlign: 'center', padding: 5 }}>
        Aby korzystać z aplikacji musisz wybrać ilość kalorii, białek,
        węglowodanów i tłuszczy
      </Text>
      <Pressable style={styles.addFoodButton}>
        <Text
          style={{ color: '#6bd2a7', fontSize: 14, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Dane użytkownika')}
        >
          Wybierz dane{' '}
        </Text>
        <Icon
          name="arrowright"
          size={15}
          color="#6bd2a7"
          fontWeight="bold"
        />
      </Pressable>
    </View>
  );
};

export default DataMissing;
