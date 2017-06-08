import DefaultPreference from 'react-native-default-preference';
import constants from '../constants';

const initialState = {
  userId: null,
  isRegistered: false,
  isLoggedIn: false
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_IS_LOGGED_IN:
      DefaultPreference.set('isLoggedIn', action.isLoggedIn.toString());
      return { ...state, isLoggedIn: action.isLoggedIn };
    case constants.SET_IS_REGISTERED:
      DefaultPreference.set('userId', action.userId.toString());
      return { ...state, isRegistered: !!action.userId, userId: action.userId.toString() };
    default:
      return state || initialState;
  }
}