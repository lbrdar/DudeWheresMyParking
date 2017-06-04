import constants from '../constants';
import { API } from '../../utils'


function parkingTypesSuccess(data) {
  return {
    type: constants.SET_PARKING_TYPES,
    data
  }
}

function parkingTakenForSlotsSuccess(data) {
  return {
    type: constants.SET_PARKING_TAKEN_FOR_SLOTS,
    data
  }
}

export function fetchParkingTypes() {
  return function (dispatch) {
    return API.getAllParkingTypes()
              .then(json => dispatch(parkingTypesSuccess(json)))
              .catch(err => console.log(err));  // eslint-disable-line no-console
  }
}

export function fetchParkingTakenForSlots() {
  return function (dispatch) {
    return API.getAllParkingTakenForSlots()
              .then(json => dispatch(parkingTakenForSlotsSuccess(json)))
              .catch(err => console.log(err));    // eslint-disable-line no-console
  }
}