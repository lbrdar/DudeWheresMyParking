import constants from '../constants';

export function setRadius(radius) {
  return {
    type: constants.SET_RADIUS,
    radius
  }
}

export function setMapType(mapType) {
  return {
    type: constants.SET_MAP_TYPE,
    mapType
  }
}