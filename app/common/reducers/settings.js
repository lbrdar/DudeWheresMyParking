import DefaultPreference from 'react-native-default-preference';
import constants from '../constants';

const initialState = {
  mapType: 'hybrid', // enum(standard, satellite, hybrid)
  radius: 300       // in meters
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_MAP_TYPE:
      DefaultPreference.set('mapType', action.mapType);
      return { ...state, mapType: action.mapType };
    case constants.SET_RADIUS:
      DefaultPreference.set('radius', action.radius.toString());
      return { ...state, radius: action.radius };
    default:
      return state || initialState;
  }
}