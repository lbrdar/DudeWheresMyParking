import DefaultPreference from 'react-native-default-preference';
import Store from '../common/store';
import * as Actions from '../common/actions';

export default function getUserPreferences() {
  return DefaultPreference
    .getAll()
    .then((data) => {
      const { userId, username, mapType } = data;
      const isLoggedIn = (data.isLoggedIn === 'true');
      const radius = (data.radius !== null) && parseInt(data.radius);
      const fetchOnPositionChange = (data.fetchOnPositionChange === 'true');
      const fetchPeriodically = (data.fetchPeriodically === 'true');
      const fetchingPeriod = data.fetchingPeriod && parseInt(data.fetchingPeriod);

      Store.dispatch(Actions.setAuthDefaults(userId, username, isLoggedIn));
      Store.dispatch(Actions.setSettingsDefaults(radius, mapType, fetchOnPositionChange, fetchPeriodically, fetchingPeriod));

      return data;
    });
}