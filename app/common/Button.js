import React, { Component, PropTypes } from 'react';
import { Button } from 'react-native-material-ui';


class MyButton extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Button
        primary={this.props.primary}
        accent={this.props.accent}
        disabled={this.props.disabled}
        raised={this.props.raised}
        text={this.props.label}
        style={this.props.style}
        onPress={this.props.onPress}
      />
    );
  }
}

MyButton.propTypes = {
  primary: PropTypes.bool,
  accent: PropTypes.bool,
  disabled: PropTypes.bool,
  raised: PropTypes.bool,
  label: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  onPress: PropTypes.func.isRequired
};

MyButton.defaultProps = {
  primary: true,
  accent: false,
  disabled: false,
  raised: true,
  style: {}
};

export default MyButton;