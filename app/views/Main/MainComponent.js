import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'


class MainScreen extends React.Component {
  static navigationOptions = { title: 'Welcome', };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Map', { name: 'Jane' })
        }
      />
    );
  }
}

export default MainScreen;