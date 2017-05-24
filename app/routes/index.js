import Home from '../views/Home';
import Map from '../views/Map';
import PlacesSearch from '../views/PlacesSearch'
import Settings from '../views/Settings';

export default {
  Main: {
    screen: Home,
  },
  Map: {
    screen: Map,
  },
  PlacesSearch: {
    screen: PlacesSearch,
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings'
    }),
  },
};