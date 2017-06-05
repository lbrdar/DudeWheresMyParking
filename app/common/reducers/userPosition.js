import constants from '../constants';

const initialState = {
    latitude: 0,
    longitude: 0
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_USER_POSITION:
      return { ...state, latitude: action.latitude, longitude: action.longitude };
    default:
      return state || initialState;
  }
}