/* eslint-disable no-console, no-undef */
import React, { PropTypes } from 'react'
import {
  View
} from 'react-native'
import MapView from 'react-native-maps';
import { geoLocationUtils } from '../../utils';
import MapHeaderOptions from './MapHeaderOptions';
import Loading from '../../common/Loading';
import styles from './MapStyle';


class MapScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radius: 300, // meters
      latitude: null,
      longitude: null,
      loading: true
    };

    this.watchID = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({ onRefresh: this.onRefresh });
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      ({ coords }) => {
        this.setState({ latitude: coords.latitude, longitude: coords.longitude, loading: false });
        console.log('Updated user position!');
      },
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRefresh = () => {
    this.setState({ loading: true });
    console.log('Loading new')

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({ latitude: coords.latitude, longitude: coords.longitude, loading: false });
        console.log('Updated user position!');
      },
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true }
    );
  };

  getRegion = () => {
    const { latitude, longitude, radius } = this.state;
    const circleBounds = geoLocationUtils.getCircleBounds({ latitude, longitude }, radius);

    return geoLocationUtils.calculateDelta([ ...circleBounds ], { latitude, longitude });
  };

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
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.getRegion()}
        >
          <MapView.Circle
            center={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            radius={this.state.radius}
            fillColor="rgba(76,175,80, 0.25)"
            strokeColor="rgb(76,175,80)"
          />
        </MapView>
      </View>

    );
  }
}

MapScreen.navigationOptions = ({ navigation }) => ({
  headerRight: <MapHeaderOptions refresh={navigation.state.params && navigation.state.params.onRefresh} />
});

MapScreen.propTypes = {
  navigation: PropTypes.shape({ // eslint-disable-line
    navigate: PropTypes.func,
    setParams: PropTypes.func
  }).isRequired
};

export default MapScreen;