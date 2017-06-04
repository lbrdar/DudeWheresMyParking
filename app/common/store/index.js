import { createStore, combineReducers } from 'redux';
import drawerReducers from '../reducers/drawer';
import navigationReducers from '../reducers/navigation';
import userPositionReducers from '../reducers/userPosition';
import settingsReducers from '../reducers/settings';

export default createStore(combineReducers({
  drawerReducers,
  navigationReducers,
  userPositionReducers,
  settingsReducers
}));