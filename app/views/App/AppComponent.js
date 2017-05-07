import React, { Component } from 'react';
import {  ThemeProvider } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import { myTheme } from '../../common';
import routes from '../../routes';

const AppNavigator = StackNavigator(routes);

class App extends Component {  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <ThemeProvider uiTheme={myTheme}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}

export default App;