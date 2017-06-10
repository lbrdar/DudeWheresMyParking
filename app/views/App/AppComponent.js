import React, { Component } from 'react';
import DefaultPreference from 'react-native-default-preference';
import { ThemeProvider } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { myTheme, Loading } from '../../common';
import routes from '../../routes';
import MyDrawer from '../../views/Drawer';
import Store from '../../common/store';
import * as Actions from '../../common/actions';


let AppNavigator = null;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };

    // DefaultPreference.clearAll();

    // get user preferences
    DefaultPreference
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

        // set initial screen --> by default it's Register, if user is registered and logged in go to Map, otherwise go to Login
        let initialRouteName = 'Register';
        if (userId) initialRouteName = isLoggedIn ? 'Map' : 'Login';
        AppNavigator = StackNavigator(routes, { initialRouteName });
        this.setState({ loading: false });
      })
      .catch(() => {
        AppNavigator = StackNavigator(routes);
        this.setState({ loading: false });
      });  // if getting auth data fails, just go to Register
  }

  render() {
    return (
      <Provider store={Store}>
        <ThemeProvider uiTheme={myTheme}>
          { this.state.loading ?
            <Loading />
            :
            <MyDrawer>
              <AppNavigator />
            </MyDrawer>
          }
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;