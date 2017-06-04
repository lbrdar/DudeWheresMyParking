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
  priceContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceInput: {
    flex: 1
  },
  unitInput: {
    flex: 2
  }
});