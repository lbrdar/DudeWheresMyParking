import DefaultPreference from 'react-native-default-preference';
import constants from '../constants';

const initialState = {
  userId: null,
  username: '',
  points: 0,
  isLoggedIn: false
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_AUTH_DEFAULTS:
      return { ...state, userId: action.userId, username: action.username, isLoggedIn: action.isLoggedIn };

    case constants.SET_IS_LOGGED_IN:
      DefaultPreference.set('isLoggedIn', action.isLoggedIn.toString());
      return { ...state, isLoggedIn: action.isLoggedIn };

    case constants.ON_REGISTERED:
      DefaultPreference.set('userId', action.userId.toString());
      DefaultPreference.set('username', action.username);
      DefaultPreference.set('isLoggedIn', 'true');
      return { ...state, userId: action.userId.toString(), username: action.username, isLoggedIn: true };

    case constants.SET_USERNAME:
      DefaultPreference.set('username', action.username);
      return { ...state, username: action.username };

    case constants.SET_POINTS:
      return { ...state, points: action.points };

    default:
      return state || initialState;
  }
}