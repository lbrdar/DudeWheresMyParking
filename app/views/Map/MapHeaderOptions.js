import React, { PropTypes } from 'react'
import {
  View
} from 'react-native'
import {
  IconToggle,
  COLOR
} from 'react-native-material-ui';
import styles from './MapStyle';


class MapHeaderOptions extends React.Component {  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <View style={styles.headerItemsContainer}>
        <IconToggle
          underlayColor={COLOR.grey400}
          name="refresh"
          onPress={this.props.refresh}
        />
      </View>

    );
  }
}

MapHeaderOptions.propTypes = {
  refresh: PropTypes.func
};

MapHeaderOptions.defaultProps = {
  refresh: () => {}
};

export default MapHeaderOptions;