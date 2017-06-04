import constants from '../constants';

export function getUserPosition() {
  return {
    type: constants.GET_USER_POSITION
  }
}
export function setUserPosition(userPosition) {
  return {
    type: constants.SET_USER_POSITION,
    userPosition
  }
}