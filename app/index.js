import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './views/App';


export default function app() {
  class Root extends Component {  // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <App />
      );
    }
  }
  AppRegistry.registerComponent('DudeWheresMyParking', () => Root);
}