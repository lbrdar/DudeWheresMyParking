import constants from '../constants';

const initialState = {
  open: false
};

export default function (state, action) {
  switch (action.type) {
    case constants.TOGGLE_DRAWER:
      return { ...state, open: !state.open };
    case constants.OPEN_DRAWER:
      return { ...state, open: true };
    case constants.CLOSE_DRAWER:
      return { ...state, open: false };
    default:
      return state || initialState;
  }
}