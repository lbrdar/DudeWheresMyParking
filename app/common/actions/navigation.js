import constants from '../constants';


export function initializeNavigation(routeName) {
  return {
    type: constants.INITIALIZE_NAVIGATION,
    routeName
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

export function setParams(params, key) {
  return {
    type: constants.SET_PARAMS,
    params,
    key
  }
}