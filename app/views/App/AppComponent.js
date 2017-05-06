import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import routes from '../../routes';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
};

const AppNavigator = StackNavigator(routes);

class App extends Component {  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}

export default App;