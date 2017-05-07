import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { COLOR } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  spinner: {
    padding: 8,
  }
});

class Loading extends Component {   // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ActivityIndicator size="large" color={COLOR.lightGreen400} style={styles.spinner} />
      </View>
    );
  }
}

Loading.propTypes = {
  style: PropTypes.number
};

Loading.defaultProps = {
  style: null
};

export default Loading;