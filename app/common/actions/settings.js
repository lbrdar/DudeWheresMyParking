import constants from '../constants';

export function setSettingsDefaults(radius, mapType, fetchOnPositionChange, fetchPeriodically, fetchingPeriod) {
  return {
    type: constants.SET_SETTINGS_DEFAULTS,
    radius,
    mapType,
    fetchOnPositionChange,
    fetchPeriodically,
    fetchingPeriod
  }
}

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

export function toggleFetchOnPositionChange() {
  return {
    type: constants.TOGGLE_FETCH_ON_POSITION_CHANGE
  }
}

export function toggleFetchPeriodically() {
  return {
    type: constants.TOGGLE_FETCH_PERIODICALLY
  }
}

export function setFetchingPeriod(period) {
  return {
    type: constants.SET_FETCHING_PERIOD,
    period
  }
}