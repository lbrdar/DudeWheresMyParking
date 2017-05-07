import Home from '../views/Home';
import Map from '../views/Map';
import Settings from '../views/Settings';

export default {
  Main: {
    screen: Home,
  },
  Map: {
    screen: Map,
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings'
    }),
  },
};