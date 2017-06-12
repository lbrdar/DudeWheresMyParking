import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { Provider } from 'react-redux';
import { myTheme, Loading } from '../../common';
import { getUserPreferences } from '../../utils';
import AppWithNavigationState from './AppNavigator';
import MyDrawer from '../../views/Drawer';
import Store from '../../common/store';
import { initializeNavigation } from '../../common/actions/navigation';
import { fetchUserAddresses } from '../../common/actions/data';


class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };

    getUserPreferences().then((data) => {

      // set initial screen --> by default it's Register, if user is registered and logged in go to Map, otherwise go to Login
      let initialRouteName = 'Register';
      if (data.userId) initialRouteName = (data.isLoggedIn === 'true') ? 'Map' : 'Login';
      Store.dispatch(initializeNavigation(initialRouteName));

      // fetch addresses
      Store.dispatch(fetchUserAddresses(data.userId));

      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <Provider store={Store}>
        <ThemeProvider uiTheme={myTheme}>
          { this.state.loading ?
            <Loading />
            :
            <MyDrawer>
              <AppWithNavigationState />
            </MyDrawer>
          }
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;