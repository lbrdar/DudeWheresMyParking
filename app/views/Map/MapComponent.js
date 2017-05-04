/* eslint-disable no-console, no-undef */
import React, { PropTypes } from 'react'
import {
  View
} from 'react-native'
import MapView from 'react-native-maps';
import geoLocationUtils from '../../utils';
import styles from './MapStyle';


class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
  };

  static propTypes = {
    navigation: PropTypes.shape({ // eslint-disable-line
      navigate: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      radius: 300, // meters
      latitude: 42.877742, // Center of USA
      longitude: -97.380979, // Center of USA
    };

    this.watchID = null;
  }

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(
      ({ coords }) => {
        this.setState({ latitude: coords.latitude, longitude: coords.longitude });
        console.log('Updated user position!');
      },
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  calculateIfNearUser = (node) => {
    const userLocation = {
      radLat: geoLocationUtils.degreeToRadian(this.state.latitude),
      radLon: geoLocationUtils.degreeToRadian(this.state.longitude),
    };
    const parkingLocation = {
      radLat: geoLocationUtils.degreeToRadian(node.latitude),
      radLon: geoLocationUtils.degreeToRadian(node.longitude),
    };

    const distance = geoLocationUtils.distance(parkingLocation, userLocation);

    return (distance*1000 <= this.state.radius);

  };

  render() {
    // const { navigate } = this.props.navigation;
    console.log(this.props);

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Circle
            center={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            radius={this.state.radius}
          />
        </MapView>
      </View>

    );
  }
}

export default MapScreen;