import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import Container from '../../common/Container';


class Settings extends Component {  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Container>
        <Text>Test this shit</Text>
      </Container>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

export default Settings;