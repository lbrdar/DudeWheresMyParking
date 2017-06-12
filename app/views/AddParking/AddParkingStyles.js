import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  name: {
    minWidth: '40%',
    fontWeight: 'bold',
    fontSize: 19,
    padding: 8,
  },
  content: {
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  columnContainer: {
    maxWidth: '60%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 8
  },

  priceInput: {
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
    justifyContent: 'space-around'
  },
});