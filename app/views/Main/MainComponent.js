import React, { PropTypes } from 'react'
import {
  Button
} from 'react-native'


class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        title="Go to Map"
        onPress={() =>
          navigate('Map', { name: 'Jane' })
        }
      />
    );
  }
}

export default MainScreen;