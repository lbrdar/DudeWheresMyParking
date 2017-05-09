/* eslint-disable no-console, no-undef */
import config from '../config';


async function getAllParkingSpots() {
  return fetch(`${config.APIserver}/parking_spots`)
    .then(res => res.json())
    .catch(err => console.log('Error in get all parking spots: ', err));
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
  getAllParkingSpots,
  getParkingSpot,
  createParkingSpot
};