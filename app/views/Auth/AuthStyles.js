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
    width: '80%',
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 5,
    fontSize: 16
  },
  button: {
    marginTop: 10
  },
  errorMsg: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});