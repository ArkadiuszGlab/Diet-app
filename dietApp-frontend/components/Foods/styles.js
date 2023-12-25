import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  searchBar: {
    width: 340,
    height: 30,
    backgroundColor: '#bdc6cf',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  mealContainer: {
    width: 340,
    backgroundColor: '#d4f2e5',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5
  },
  mealButton: {
    elevation: 5,
    backgroundColor: '#6bd2a7',
    width: 340,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  foodText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  detailsButton: {
    elevation: 5,
    backgroundColor: '#6bd2a7',
    width: 90,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 5,
    margin: 15
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  addNewFoodButton: {
    elevation: 5,
    backgroundColor: '#6bd2a7',
    width: 340,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 5,
    backgroundColor: 'gray',
    alignSelf: 'center'
  },
  selectDropdownButtonStyle: {
    width: '93%',
    height: 40,
    elevation: 5,
    margin: 5
  },
  selectDropdownButtonTxtStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectDropdownStyle: {
    backgroundColor: '#669983'
  },
  selectDropdownRowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#C5C5C5'
  },
  selectDropdownRowTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectDropdownSelectedRowStyle: { backgroundColor: '#C5C5C5' }
});

export default styles;
