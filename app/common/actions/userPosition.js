import constants from '../constants';

export function setUserPosition(latitude, longitude) { // eslint-disable-line import/prefer-default-export
  return {
    type: constants.SET_USER_POSITION,
    latitude,
    longitude
  }
}