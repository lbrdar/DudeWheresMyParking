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
    paddingTop: 0
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