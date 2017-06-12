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

async function getPoints(userId) {
  return fetch(`${config.APIserver}/users/${userId}`)
    .then(res => res.json())
    .catch(err => console.log('Error in get points: ', err));
}

async function getUserAddresses(userId) {
  return fetch(`${config.APIserver}/user_addresses/${userId}`)
    .then(res => res.json())
    .catch(err => console.log('Error in get user addresses: ', err));
}

async function createUserAddress(address, userId) {
  return fetch(`${config.APIserver}/user_addresses/${userId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address)
  })
    .then(res => res.json())
    .catch(err => console.log('Error in create parking spot: ', err));
}

async function setUsername(userId, username) {
  return fetch(`${config.APIserver}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username })
  })
    .catch(err => console.log('Error in set username: ', err));
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

async function createParkingSpot(parkingSpot, userId) {
  return fetch(`${config.APIserver}/parking_spots`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parkingSpot, userId })
  })
    .then(res => res.json())
    .catch(err => console.log('Error in create parking spot: ', err));
}

async function takeParkingSpot(id, takenForId, userId) {
  return fetch(`${config.APIserver}/parking_spots/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, takenForId })
  })
    .catch(err => console.log('Error in take parking spot: ', err));
}


export default {
  login,
  register,
  getPoints,
  setUsername,
  getUserAddresses,
  createUserAddress,
  getAllParkingTypes,
  getAllParkingTakenForSlots,
  getAllParkingSpots,
  getParkingSpotsNear,
  getParkingSpot,
  createParkingSpot,
  takeParkingSpot
};