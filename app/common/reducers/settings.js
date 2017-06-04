import constants from '../constants';

const initialState = {
  mapType: 'hybrid', // enum(standard, satellite, hybrid)
  radius: 300       // in meters
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_MAP_TYPE:
      return { ...state, mapType: action.mapType };
    case constants.SET_RADIUS:
      return { ...state, radius: action.radius };
    default:
      return state || initialState;
  }
}