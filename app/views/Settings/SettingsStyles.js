import { StyleSheet } from 'react-native';

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
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 15,
    fontSize: 16
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
  radioIconContainerStyle: {
    height: 40
  },
  dropDownLabel: {
    paddingHorizontal: 8,
    width: '50%'
  },
  dropdownContainer: {
    margin: 8,
    padding: 8,
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  dropdown: {
    width: '60%',
  },
  dropdownText: {
    fontSize: 16
  },
  dropdownOpenText: {
    fontSize: 14
  },
});