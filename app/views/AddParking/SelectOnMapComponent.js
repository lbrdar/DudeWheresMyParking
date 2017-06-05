import React, { PropTypes } from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps';
import styles from './AddParkingStyles';

class SelectOnMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: props.center.latitude,
        longitude: props.center.longitude,
        latitudeDelta: 0.001, // zoom big enough so user can precisely select correct position
        longitudeDelta: 0.001
      }
    };
  }

  onRegionChangeComplete = region => this.setState({ region });

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          mapType={this.props.mapType}
          style={styles.map}
          region={this.state.region}
          zoomEnabled={false}
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.props.onSelect}
        />
      </View>
    );
  }
}

SelectOnMap.propTypes = {
  center: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  mapType: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

SelectOnMap.defaultProps = {
  mapType: 'standard'
};

export default SelectOnMap;