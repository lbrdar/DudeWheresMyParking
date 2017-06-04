import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { myTheme } from '../../common';
import routes from '../../routes';
import MyDrawer from '../../views/Drawer';
import Store from '../../common/store';


const AppNavigator = StackNavigator(routes);

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