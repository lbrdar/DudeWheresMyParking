import DefaultPreference from 'react-native-default-preference';
import constants from '../constants';

const initialState = {
  mapType: 'hybrid', // enum(standard, satellite, hybrid)
  radius: 300,      // in meters
  fetchOnPositionChange: false,
  fetchPeriodically: false,
  fetchingPeriod: 60*1000 // 1 minute
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_SETTINGS_DEFAULTS:
      return {
        ...state,
        mapType: action.mapType || state.mapType,
        radius: action.radius || state.radius,
        fetchOnPositionChange: action.fetchOnPositionChange,
        fetchPeriodically: action.fetchPeriodically,
        fetchingPeriod: action.fetchingPeriod || state.fetchingPeriod
      };

    case constants.SET_MAP_TYPE:
      DefaultPreference.set('mapType', action.mapType);
      return { ...state, mapType: action.mapType };

    case constants.SET_RADIUS:
      DefaultPreference.set('radius', action.radius.toString());
      return { ...state, radius: action.radius };

    case constants.TOGGLE_FETCH_ON_POSITION_CHANGE:
      DefaultPreference.set('fetchOnPositionChange', (!state.fetchOnPositionChange).toString());
      return { ...state, fetchOnPositionChange: !state.fetchOnPositionChange };

    case constants.TOGGLE_FETCH_PERIODICALLY:
      DefaultPreference.set('fetchPeriodically', (!state.fetchPeriodically).toString());
      return { ...state, fetchPeriodically: !state.fetchPeriodically };

    case constants.SET_FETCHING_PERIOD:
      DefaultPreference.set('fetchingPeriod', action.period.toString());
      return { ...state, fetchingPeriod: action.period };

    default:
      return state || initialState;
  }
}