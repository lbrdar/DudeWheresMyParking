import constants from '../constants';

const initialState = {
  types: [],
  takenForSlots: [],
  userAddresses: []
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_PARKING_TYPES:
      return { ...state, types: action.data };

    case constants.SET_PARKING_TAKEN_FOR_SLOTS:
      return { ...state, takenForSlots: action.data };

    case constants.SET_USER_ADDRESSES:
      return { ...state, userAddresses: action.data };

    case constants.NEW_ADDRESS:
      return { ...state, userAddresses: [...state.userAddresses, action.address] };

    default:
      return state || initialState;
  }
}