import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
    padding: 8,
  },
  description: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 4,
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
  }
});