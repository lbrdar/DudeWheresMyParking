import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import * as Actions from './actions/navigation';

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class BasicScreenHeader extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Toolbar
        centerElement={this.props.screenName}
        leftElement="arrow-back"
        onLeftElementPress={this.props.goBack}
        rightElement={this.props.rightElement}
      />
    );
  }
}

BasicScreenHeader.propTypes = {
  screenName: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  rightElement: PropTypes.element
};

BasicScreenHeader.defaultProps = {
  rightElement: null
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicScreenHeader);