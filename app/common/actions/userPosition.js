import constants from '../constants';

export function setUserPosition(userPosition) { // eslint-disable-line import/prefer-default-export
  return {
    type: constants.SET_USER_POSITION,
    userPosition
  }
}