import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arcContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%'
  },
  caloriesColumn: {
    justifyContent: 'flex-start'
  },
  topText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  },
  botTextArc: {
    opacity: 0.5,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  botTextProgress: {
    opacity: 0.5,
    paddingBottom: 10,
    alignSelf: 'flex-start'
  },
  row: {
    flexDirection: 'row'
  },
  mealButton: {
    elevation: 5,
    backgroundColor: '#6bd2a7',
    width: 360,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  foodRow: {
    backgroundColor: '#d4f2e5',
    width: 340,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 20,
    borderBottomWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  foodText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  mealContainer: {
    width: 350,
    backgroundColor: '#d4f2e5',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5
  },
  addFoodButton: {
    elevation: 5,
    backgroundColor: '#282828',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 5,
    margin: 15
  }
});

export default styles;
