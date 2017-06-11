import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../views/App/AppNavigator';
import constants from '../constants';

const initialState = {};

export default function (state, action) {
  switch (action.type) {
    case constants.INITIALIZE_NAVIGATION: // eslint-disable-line no-case-declarations
      const initialScreen = AppNavigator.router.getActionForPathAndParams(action.routeName);
      return AppNavigator.router.getStateForAction(initialScreen);

    case constants.NAVIGATE:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName, params: action.params }),
        state
      );

    case constants.GO_BACK:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );

    case constants.SET_PARAMS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.setParams({ params: action.params, key: action.key }),
        state
      );

    default:
      return state || initialState;
  }
}