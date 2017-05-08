import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWindow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerCallout: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  dialogContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    paddingHorizontal: 4,
  },
  dialogActionsContainer: {
    flexDirection: 'row'
  }
});