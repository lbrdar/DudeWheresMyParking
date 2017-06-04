import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, ScreenHeader } from '../../common';
import * as Actions from '../../common/actions';

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Settings extends Component {  // eslint-disable-line react/prefer-stateless-function

  componentWillMount () {
    this.props.setNavigator(this.props.navigation);
  }

  render() {
    return (
      <Container>
        <Text>Test this shit</Text>
      </Container>
    );
  }
}

Settings.navigationOptions = () => ({
  header: <ScreenHeader screenName="Settings" />
});

Settings.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  setNavigator: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);