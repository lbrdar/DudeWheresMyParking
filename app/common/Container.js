import { View, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Container extends Component {   // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

Container.propTypes = {
  style: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  style: null
};

export default Container;