import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';
import { ThemeProvider } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { myTheme } from '../../common';
import routes from '../../routes';
import MyDrawer from '../../views/Drawer';
import Store from '../../common/store';
import * as Actions from '../../common/actions/settings';


const AppNavigator = StackNavigator(routes);

// get user preferences
DefaultPreference
  .getMultiple(['radius', 'mapType'])
  .then((res) => {
    const radius = (res[0] !== null) ? parseInt(res[0]) || 300 : 300;
    const mapType = (res[1] !== null) ? res[1] : 'hybrid';

    Store.dispatch(Actions.setRadius(radius));
    Store.dispatch(Actions.setMapType(mapType));
  });

class App extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={Store}>
        <ThemeProvider uiTheme={myTheme}>
          <MyDrawer>
            <AppNavigator />
          </MyDrawer>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;