import { Calories as C } from './components/Calories/Calories';
import { Metrics as M } from './components/Metrics/Metrics';
import { Foods as F } from './components/Foods/Foods';
import { Barcode } from './components/Barcode/Barcode';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HeaderIcon = ({ name }) => {
  return (
    <Icon
      name={name}
      size={30}
    />
  );
};

export default function App() {
  const Calories = ({ navigation }) => {
    return <C navigation={navigation} />;
  };

  const Metrics = ({ navigation }) => {
    return <M navigation={navigation} />;
  };

  const Foods = ({ navigation, route }) => {
    return (
      <F
        navigation={navigation}
        route={route}
      />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Wykresy') {
              iconName = 'chart-donut';
            } else if (route.name === 'Dane użytkownika') {
              iconName = 'account-settings';
            } else if (route.name === 'Lista produktów') {
              iconName = 'food';
            } else if (route.name === 'Kod kreskowy') {
              iconName = 'barcode-scan';
            }
            return (
              <Icon
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#6bd2a7',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen
          name="Wykresy"
          component={Calories}
          options={{ headerTitle: () => <HeaderIcon name="home" /> }}
        />
        <Tab.Screen
          name="Lista produktów"
          component={Foods}
          options={{ headerTitle: () => <HeaderIcon name="food" /> }}
        />
        <Tab.Screen
          name="Kod kreskowy"
          component={Barcode}
          options={{
            headerTitle: () => <HeaderIcon name="barcode-scan" />
          }}
        />
        <Tab.Screen
          name="Dane użytkownika"
          component={Metrics}
          options={{
            headerTitle: () => <HeaderIcon name="account-settings" />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

