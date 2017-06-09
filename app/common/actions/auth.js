import constants from '../constants';
import { API } from '../../utils';
import { navigate } from './navigation';

export function setAuthDefaults(userId, username, isLoggedIn) {
  return {
    type: constants.SET_AUTH_DEFAULTS,
    userId,
    username,
    isLoggedIn
  }
}

export function onRegistered(userId, username) {
  return {
    type: constants.ON_REGISTERED,
    userId,
    username
  }
}

export function setIsLoggedIn(isLoggedIn) {
  return {
    type: constants.SET_IS_LOGGED_IN,
    isLoggedIn
  }
}

function setUsernameInState(username) {
  return {
    type: constants.SET_USERNAME,
    username
  }
}

function setPoints(data) {
  return {
    type: constants.SET_POINTS,
    points: data.points
  }
}


export function register(username, password) {
  return function (dispatch) {
    return API.register(username, password)
              .then((ids) => {
                dispatch(onRegistered(ids[0], username));
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

export function fetchPoints(userId) {
  return function (dispatch) {
    return API.getPoints(userId)
              .then((data) => dispatch(setPoints(data)))
              .catch(err => console.log(err));  // eslint-disable-line no-console
  }
}

export function setUsername(userId, username) {
  return function (dispatch) {
    return API.setUsername(userId, username)
              .then(() => dispatch(setUsernameInState(username)))
              .catch(err => console.log(err));  // eslint-disable-line no-console
  }
}