import React, { Component, PropTypes } from 'react';
import Container from '../../common/Container';
import Button from '../../common/Button';
import styles from './HomeStyle';


class Home extends Component {  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Container style={styles.buttonContainer}>
          <Button
            label="Go to map"
            onPress={()=> navigate('Map')}
          />
          <Button
            label="Go to Settings"
            onPress={()=> navigate('Settings')}
          />
        </Container>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

export default Home;