import { StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

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
  row: {
    flexDirection: 'row',
    paddingVertical: 3
  },
  label: {
    fontWeight: 'bold'
  },
  note: {
    paddingTop: 6
  },
  dialogActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dropdownContainer: {
    margin: 6,
    padding: 6,
    width: '80%',
    backgroundColor: COLOR.pink500
  },
  dropdown: {
    width: '60%',
  }
});