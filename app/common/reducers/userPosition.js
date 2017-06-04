import constants from '../constants';

const initialState = {
  position: {
    latitude: 0,
    longitude: 0
  }
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_USER_POSITION:
      return { ...state, position: action.userPosition };
    default:
      return state || initialState;
  }
}