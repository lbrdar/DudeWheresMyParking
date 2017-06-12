import { StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  contentRow: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    padding: 12,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    paddingLeft: 0,
    flex: 1
  },
  description: {
    padding: 8,
    textAlign: 'justify'
  },
  input: {
    flex: 1,
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
  listContainer: {
    padding: 4,
  },
  addressRow: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: '80%',
    borderBottomColor: COLOR.grey400
  },
  address: {
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 4
  },
  addressValue: {

  }
});