import constants from '../constants';

const initialState = {
  types: [],
  takenForSlots: []
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_PARKING_TYPES:
      return { ...state, types: action.data };
    case constants.SET_PARKING_TAKEN_FOR_SLOTS:
      return { ...state, takenForSlots: action.data };
    default:
      return state || initialState;
  }
}