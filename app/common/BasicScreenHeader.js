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
        leftElement={this.props.allowGoBack ? 'arrow-back' : null}
        onLeftElementPress={this.props.allowGoBack ? this.props.goBack : null}
        rightElement={this.props.rightElement}
      />
    );
  }
}

BasicScreenHeader.propTypes = {
  screenName: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  rightElement: PropTypes.element,
  allowGoBack: PropTypes.bool
};

BasicScreenHeader.defaultProps = {
  rightElement: null,
  allowGoBack: true
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicScreenHeader);