import constants from '../constants';
import { API } from '../../utils';
import { navigate } from './navigation';

export function setIsRegistered(userId) {
  return {
    type: constants.SET_IS_REGISTERED,
    userId
  }
}

export function setIsLoggedIn(isLoggedIn) {
  return {
    type: constants.SET_IS_LOGGED_IN,
    isLoggedIn
  }
}


export function register(username, password) {
  return function (dispatch) {
    return API.register(username, password)
              .then((ids) => {
                dispatch(setIsRegistered(ids[0]));
                dispatch(setIsLoggedIn(true));
                dispatch(navigate('Map'));
              })
              .catch(err => console.log(err));  // eslint-disable-line no-console
  }
}

export function login(id, password) {
  return function (dispatch) {
    return API.login(id, password)
              .then(() => {
                dispatch(setIsLoggedIn(true));
                dispatch(navigate('Map'));
              })
              .catch(err => console.log(err));  // eslint-disable-line no-console
  }
}