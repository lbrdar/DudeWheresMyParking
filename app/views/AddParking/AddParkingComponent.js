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

class AddParking extends Component {  // eslint-disable-line react/prefer-stateless-function

  componentWillMount () {
    this.props.setNavigator(this.props.navigation);
  }

  render() {
    return (
      <Container>
        <Text>Add parking component</Text>
      </Container>
    );
  }
}

AddParking.navigationOptions = () => ({
  header: <ScreenHeader screenName="Add parking spot" />
});

AddParking.propTypes = {
  setNavigator: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);