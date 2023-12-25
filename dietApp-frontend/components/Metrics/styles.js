import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: '#669983',
    borderRadius: 8,
    elevation: 5,
    margin: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '400',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 19,
    width: 50
  },
  inputs: {
    rowGap: 10
  },
  box: {
    width: 160,
    height: 175,
    backgroundColor: '#6bd2a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
    marginTop: 2,
    elevation: 5
  },
  selectDropdownButtonStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#669983',
    borderRadius: 8,
    elevation: 5
  },
  selectDropdownButtonTxtStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectDropdownStyle: {
    backgroundColor: '#669983',
    borderRadius: 12
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
  selectDropdownSelectedRowStyle: { backgroundColor: '#669983' }
});

export default styles;
