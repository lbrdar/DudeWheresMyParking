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

function userAddressesSuccess(data) {
  return {
    type: constants.SET_USER_ADDRESSES,
    data
  }
}

function newAddressSuccess(position, address, label) {
  return {
    type: constants.NEW_ADDRESS,
    address: {
      ...position,
      address,
      label
    }
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

export function addParkingSpot(position, typeId, price, userId) {
  return function () {
    return API.createParkingSpot({ latitude: position.latitude, longitude: position.longitude, type_id: typeId, costPerHour: price }, userId)
              .then(() => console.log('Successfully added'))  // eslint-disable-line no-console
              .catch(err => console.log(err));   // eslint-disable-line no-console
  }
}

export function fetchUserAddresses(userId) {
  return function (dispatch) {
    return API.getUserAddresses(userId)
              .then(data => dispatch(userAddressesSuccess(data)))
              .catch(err => console.log(err));    // eslint-disable-line no-console
  }
}

export function addUserAddress(position, address, label, userId) {
  return function (dispatch) {
    return API.createUserAddress({ latitude: position.latitude, longitude: position.longitude, address, label }, userId)
              .then(() => dispatch(newAddressSuccess(position, address, label)))  // eslint-disable-line no-console
              .catch(err => console.log(err));   // eslint-disable-line no-console
  }
}