import { View, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';
import Spinner from 'react-native-spinkit';
import { COLOR } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  spinner: {
    padding: 8,
  }
});

class Loading extends Component {   // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Spinner style={styles.spinner} isVisible size={80} type="FadingCircleAlt" color={COLOR.lightGreen400} />
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