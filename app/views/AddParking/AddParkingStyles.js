import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
    padding: 8,
    marginRight: 10,
    alignSelf: 'center'
  },
  value: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  content: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },

  position: {
    minWidth: '60%',
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    marginLeft: 15,
    fontSize: 16
  },

  priceInput: {
    flex: 1,
    minWidth: '40%',
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

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8
  },

  dropdownContainer: {
    flex: 1,
    minWidth: '40%',
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 15
  },
  dropdown: {
    width: '80%',
  },
  dropdownText: {
    fontSize: 16
  },
  dropdownOpenText: {
    fontSize: 14
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