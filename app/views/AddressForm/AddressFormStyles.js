import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1
  },
  content: {
    padding: 8,
    flexDirection: 'column',
  },
  contentRow: {
    padding: 8,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    paddingLeft: 0,
  },
  description: {
    fontWeight: 'bold',
    color: 'black'
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  textInput: {
    fontSize: 16,
    padding: 5,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  loader: {
    marginRight: 5,
  },
  listView: {
    backgroundColor: 'white'
  },
  predefinedPlacesDescription: {
    color: 'black',
  },
  poweredContainer: {

  },
  powered: {

  },
  placesIcon: {

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
    marginLeft: 15,
    fontSize: 16
  },
  errorMsg: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10
  }
});