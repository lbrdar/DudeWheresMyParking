/* eslint-disable no-console, no-undef */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps';
import moment from 'moment';
import { geoLocationUtils, getAllParkingSpots, getParkingSpot } from '../../utils';
import { Loading } from '../../common';
import MapTypeModal from './MapTypeModal';
import MapHeader from './MapHeader';
import styles from './MapStyle';


class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radius: 300, // meters
      latitude: null,
      longitude: null,
      loading: true,
      mapType: 'standard',
      parkingSpots: [],
      activeMarker: null,
      selectedParkingSpot: null
    };

    this.watchID = null;
  }

  componentWillMount() {
    getAllParkingSpots()
      .then(parkingSpots => this.setState({ parkingSpots }))
      .catch(err => console.log('Failed to retrieve parking spots. ', err));
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

  onMapTypeChange = (newType) => {
    this.setState({ mapType: newType });
  };

  onMarkerPress = (id) => {
    this.setState({ activeMarker: id, selectedParkingSpot: null }); // override previously selected
    getParkingSpot(id)
      .then(data => this.setState({ selectedParkingSpot: data }))
      .catch(err => console.log('Failed to retrieve parking spot. ', err));
  };

  onCalloutPress = () => {
    this.setState({ activeMarker: null, selectedParkingSpot: null });
  };

  getRegion = () => {
    const { latitude, longitude, radius } = this.state;
    const circleBounds = geoLocationUtils.getCircleBounds({ latitude, longitude }, radius);

    return geoLocationUtils.calculateDelta([...circleBounds], { latitude, longitude });
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

    return (distance * 1000 <= this.state.radius);

  };


  renderMarkerCallout = () => {
    const { type, cost, taken, takenFor } = this.state.selectedParkingSpot;
    return (
      <View style={styles.markerCallout}>
        <Text>Type: {type}</Text>
        <Text>Price per hour: {cost}</Text>
        <Text>Is free: {taken ? 'false' : 'true'}</Text>
        {taken ? <Text>Was taken on: {moment(taken).format('DD MMMM YYYY HH:mm')}</Text> : null}
        {takenFor ? <Text>Should be available on: {moment(taken).add(takenFor, 'seconds').format('DD MMMM YYYY HH:mm')}</Text> : null}
      </View>
    );
  };

  renderMarker = ({ id, latitude, longitude }) => {
    const { selectedParkingSpot, activeMarker } = this.state;
    return (
      <MapView.Marker
        key={id}
        coordinate={{ latitude, longitude }}
        onPress={() => this.onMarkerPress(id)}
      >
        <MapView.Callout style={styles.markerWindow} onPress={this.onCalloutPress}>
          { (activeMarker === id) ? (selectedParkingSpot ? this.renderMarkerCallout() : <Loading />) : null }
        </MapView.Callout>
      </MapView.Marker>
    )
  };

  render() {
    const { loading, latitude, longitude, radius, mapType, parkingSpots } = this.state;
    const { params } = this.props.navigation.state;

    if (loading) return <Loading />;

    return (
      <View style={styles.container}>
        <MapView
          mapType={mapType}
          style={styles.map}
          region={this.getRegion()}
          showsUserLocation
          showsMyLocationButton
        >
          <MapView.Circle
            center={{ latitude, longitude }}
            radius={radius}
            fillColor="rgba(76,175,80, 0.25)"
            strokeColor="rgb(76,175,80)"
          />
          { parkingSpots.length ? parkingSpots.map(this.renderMarker) : null }
        </MapView>

        { params && params.openTypeModal ?
          <View style={styles.dialogContainer}>
            <MapTypeModal navigation={this.props.navigation} changeType={this.onMapTypeChange} selectedType={mapType} />
          </View>
          : null
        }
      </View>

    );
  }
}

Map.navigationOptions = ({ navigation }) => ({
  header: <MapHeader navigation={navigation} />
});

Map.propTypes = {
  navigation: PropTypes.shape({ // eslint-disable-line
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({})
    })
  }).isRequired
};

export default Map;