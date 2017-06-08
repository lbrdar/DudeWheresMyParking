import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    padding: 8,
  },
  description: {
    padding: 16,
    textAlign: 'center'
  },
  form: {
    paddingHorizontal: 4,
  },
  input: {
    width: '80%'
  }
});