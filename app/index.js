import { StackNavigator, } from 'react-navigation';

import MainScreen from './views/Main';
import MapScreen from './views/Map';


const app = StackNavigator({
  Main: { screen: MainScreen },
  Map: { screen: MapScreen }
});

export default app;
