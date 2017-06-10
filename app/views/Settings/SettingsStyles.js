import { StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    paddingBottom: 24
  },
  settingContainer: {
    marginBottom: 12
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
    padding: 8,
  },
  description: {
    padding: 8,
    paddingTop: 0,
    paddingLeft: 12,
  },
  content: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
  },
  insetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
    marginTop: -12,
    marginLeft: 55
  },
  radiusContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radiusInput: {
    flex: 1
  },
  unitLabel: {
    flex: 2
  },
  switch: {
  },
  switchLabel: {
    paddingHorizontal: 8,
    width: '90%'
  },
  radioButton: {
    padding: 0,
    margin: 0
  },
  dropDownLabel: {
    paddingHorizontal: 8,
    width: '50%'
  },
  dropdownContainer: {
    margin: 6,
    padding: 6,
    width: '50%',
    borderBottomColor: COLOR.black,
    backgroundColor: COLOR.grey50
  },
  dropdown: {
    width: '60%',
  }
});