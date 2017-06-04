import constants from '../constants';

export function setNavigator(navigator) {
  return {
    type: constants.SET_NAVIGATOR,
    navigator
  }
}

export function navigate(routeName, params) {
  return {
    type: constants.NAVIGATE,
    routeName,
    params
  }
}
export function goBack() {
  return {
    type: constants.GO_BACK
  }
}