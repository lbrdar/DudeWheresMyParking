import Map from '../views/Map';
import PlacesSearch from '../views/PlacesSearch';
import AddParking from '../views/AddParking';
import Settings from '../views/Settings';

export default {
  Map: {
    screen: Map,
  },
  PlacesSearch: {
    screen: PlacesSearch,
  },
  AddParking: {
    screen: AddParking,
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: 'Settings'
    }),
  },
};