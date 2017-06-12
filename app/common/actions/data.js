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

function parkingSpotsSuccess(data) {
  return {
    type: constants.SET_PARKING_SPOTS,
    data
  }
}

function newParkingSpot(parkingSpot) {
  return {
    type: constants.NEW_PARKING_SPOT,
    parkingSpot
  }
}

function tookParkingSpot(id) {
  return {
    type: constants.TOOK_PARKING_SPOT,
    id
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

export function fetchParkingSpots(location, radius) {
  return function (dispatch) {
    return API.getParkingSpotsNear(location, radius)
              .then(data => dispatch(parkingSpotsSuccess(data)))
              .catch(err => console.log('Failed to retrieve parking spots. ', err)); // eslint-disable-line no-console
  }
}

export function addParkingSpot(position, typeId, price, userId) {
  return function (dispatch) {
    return API.createParkingSpot({ latitude: position.latitude, longitude: position.longitude, type_id: typeId, costPerHour: price }, userId)
              .then((data) => dispatch(newParkingSpot(data[0])))
              .catch(err => console.log(err));   // eslint-disable-line no-console
  }
}

export function takeParkingSpot(id, takenFor_id, userId) {
  return function (dispatch) {
    return API.takeParkingSpot(id, takenFor_id, userId)
              .then(() => dispatch(tookParkingSpot(id)))
              .catch(err => console.log('Failed to take parking spot. ', err)); // eslint-disable-line no-console

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