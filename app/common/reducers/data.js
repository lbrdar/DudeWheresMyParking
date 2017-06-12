import constants from '../constants';

const initialState = {
  types: [],
  takenForSlots: [],
  parkingSpots: [],
  userAddresses: []
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_PARKING_TYPES:
      return { ...state, types: action.data };

    case constants.SET_PARKING_TAKEN_FOR_SLOTS:
      return { ...state, takenForSlots: action.data };

    case constants.SET_PARKING_SPOTS:
      return { ...state, parkingSpots: action.data };

    case constants.NEW_PARKING_SPOT:
      return { ...state, parkingSpots: [...state.parkingSpots, action.parkingSpot] };

    case constants.TOOK_PARKING_SPOT:
      return { ...state, parkingSpots: state.parkingSpots.filter(spot => spot.id !== action.id) };

    case constants.SET_USER_ADDRESSES:
      return { ...state, userAddresses: action.data };

    case constants.NEW_ADDRESS:
      return { ...state, userAddresses: [...state.userAddresses, action.address] };

    default:
      return state || initialState;
  }
}