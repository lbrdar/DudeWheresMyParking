import constants from '../constants';

const initialState = {
  navigator: null
};

export default function (state, action) {
  switch (action.type) {
    case constants.SET_NAVIGATOR:
      return { ...state, navigator: action.navigator };

    case constants.NAVIGATE:
      if (state.navigator) {
        state.navigator.navigate(action.routeName, action.params);
      }
      return state;

    case constants.GO_BACK:
      if (state.navigator) {
        state.navigator.goBack();
      }
      return state;

    default:
      return state || initialState;
  }
}