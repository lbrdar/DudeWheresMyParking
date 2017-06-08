/* eslint-disable no-console, no-undef */
import config from '../config';

async function register(username, password) {
  return fetch(`${config.APIserver}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .catch(err => console.log('Error in register: ', err));
}

async function login(userId, password) {
  return fetch(`${config.APIserver}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password })
  })
    .catch(err => console.log('Error in login: ', err));
}

async function getAllParkingTypes() {
  return fetch(`${config.APIserver}/parking_types`)
    .then(res => res.json())
    .catch(err => console.log('Error in get all parking spots: ', err));
}

async function getAllParkingTakenForSlots() {
  return fetch(`${config.APIserver}/parking_taken_for_slots`)
    .then(res => res.json())
    .catch(err => console.log('Error in get all parking spots: ', err));
}

async function getAllParkingSpots() {
  return fetch(`${config.APIserver}/parking_spots`)
    .then(res => res.json())
    .catch(err => console.log('Error in get all parking spots: ', err));
}

async function getParkingSpotsNear(location, radius) {
  return fetch(`${config.APIserver}/parking_spots/near?latitude=${location.latitude}&longitude=${location.longitude}&radius=${radius}`)
    .then(res => res.json())
    .catch(err => console.log('Error in get parking spots near location: ', err));
}

async function getParkingSpot(id) {
  return fetch(`${config.APIserver}/parking_spots/${id}`)
    .then(res => res.json())
    .then(resJson => resJson[0])
    .catch(err => console.log('Error in get parking spot: ', err));
}

async function createParkingSpot(parkingSpot) {
  return fetch(`${config.APIserver}/parking_spots`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parkingSpot)
  })
    .then(res => res.json())
    .catch(err => console.log('Error in create parking spot: ', err));
}


export default {
  login,
  register,
  getAllParkingTypes,
  getAllParkingTakenForSlots,
  getAllParkingSpots,
  getParkingSpotsNear,
  getParkingSpot,
  createParkingSpot
};