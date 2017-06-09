import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    flex: 1
  },
  description: {
    padding: 8,
  },
  input: {
    flex: 1
  },
});