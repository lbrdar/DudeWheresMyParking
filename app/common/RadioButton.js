import React, { Component, PropTypes } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { RippleFeedback, IconToggle } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  label: {
    alignSelf: 'center'
  }
});


class RadioButton extends Component {  // eslint-disable-line react/prefer-stateless-function
  onPress = () => {
    const {  disabled, onPress, value } = this.props;

    if (!disabled && onPress) {
      onPress(value);
    }
  };

  render() {
    const { checked, checkedIcon, uncheckedIcon, label, disabled, style, labelStyle } = this.props;

    return (
      <RippleFeedback onPress={this.onPress}>
        <View style={[styles.container, style]}>
          <IconToggle
            name={checked ? checkedIcon : uncheckedIcon}
            disabled={disabled}
            onPress={this.onPress}
          />
          <Text style={[styles.label, labelStyle]}>
            {label}
          </Text>
        </View>
      </RippleFeedback>
    );
  }
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  checkedIcon: PropTypes.string,
  uncheckedIcon: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.number,
  labelStyle: PropTypes.number,
  onPress: PropTypes.func.isRequired
};

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  checkedIcon: 'radio-button-checked',
  uncheckedIcon: 'radio-button-unchecked',
  style: null,
  labelStyle: null
};

export default RadioButton;