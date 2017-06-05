/* eslint-disable no-console, no-undef */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geoLocationUtils, API } from '../../utils';
import { Loading } from '../../common';
import MapHeader from './MapHeader';
import styles from './MapStyles';
import * as Actions from '../../common/actions';

function mapStateToProps(state) {
  return {
    settings: state.settingsReducers,
    drawer: state.drawerReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
      parkingFindingLocation: {
        latitude: null,
        longitude: null
      },
      findParkingNearUser: true,
      isInitialRendering: true,
      loading: true,
      parkingSpots: [],
      activeMarker: null,
      selectedParkingSpot: null
    };

    this.watchID = null;
  }

  componentWillMount() {
    this.props.fetchParkingTypes();
    this.props.fetchParkingTakenForSlots();
    this.props.setNavigator(this.props.navigation);
    this.props.navigation.setParams({ onRefresh: this.onRefresh, onPlaceSelect: this.onPlaceSelect });
  }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      this.updateUserPosition,
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRefresh = () => {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      this.updateUserPosition,
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true }
    );

    if (!this.state.findParkingNearUser) {  // if it's true, it will be handled when new userPosition is received in updateUserPosition
      this.getParkingSpots(this.state.parkingFindingLocation);
    }
  };

  onPlaceSelect = ({ latitude, longitude }) => {
    this.setState({
      region: this.getRegion(latitude, longitude, this.props.settings.radius),
      parkingFindingLocation: { latitude, longitude },
      findParkingNearUser: false
    })
  };

  onRegionChangeComplete = region => this.setState({ region });
  onMarkerPress = (id) => {
    this.setState({ activeMarker: id, selectedParkingSpot: null }); // override previously selected
    API.getParkingSpot(id)
      .then(data => this.setState({ selectedParkingSpot: data }))
      .catch(err => console.log('Failed to retrieve parking spot. ', err));
  };
  onCalloutPress = () => this.setState({ activeMarker: null, selectedParkingSpot: null });


  getParkingSpots = (location) => {
    API.getParkingSpotsNear(location, this.props.settings.radius)
       .then(parkingSpots => ( parkingSpots && this.setState({ parkingSpots }) ))
       .catch(err => console.log('Failed to retrieve parking spots. ', err));
  };
  getRegion = (latitude, longitude, radius) => {
    const circleBounds = geoLocationUtils.getCircleBounds({ latitude, longitude }, radius);

    return geoLocationUtils.calculateDelta([...circleBounds], { latitude, longitude });
  };
  updateUserPosition = ({ coords: { latitude, longitude } }) => {
    this.props.setUserPosition({ latitude, longitude });

    if (this.state.findParkingNearUser) {
      this.getParkingSpots({latitude, longitude});
      this.setState({ parkingFindingLocation: { latitude, longitude } });
    }

    // center map to fit user's circle only the first time user position is retrieved
    const region = this.state.isInitialRendering ? this.getRegion(latitude, longitude, this.props.settings.radius) : this.state.region;
    this.setState({
      region,
      loading: false,
      isInitialRendering: false
    });
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
    const { loading, region, parkingSpots, parkingFindingLocation } = this.state;
    const { settings: { radius, mapType } } = this.props;

    if (loading) return <Loading />;

    return (
      <View style={styles.container}>
        <MapView
          mapType={mapType}
          style={styles.map}
          region={region}
          showsUserLocation
          showsMyLocationButton
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          <MapView.Circle
            center={parkingFindingLocation}
            radius={radius}
            fillColor="rgba(76,175,80, 0.25)"
            strokeColor="rgb(76,175,80)"
          />
          { parkingSpots.length ? parkingSpots.map(this.renderMarker) : null }
        </MapView>
      </View>

    );
  }
}

Map.navigationOptions = ({ navigation }) => ({
  header: <MapHeader navigation={navigation} />
});

Map.propTypes = {
  settings: PropTypes.shape({
    radius: PropTypes.number.isRequired,
    mapType: PropTypes.string.isRequired
  }).isRequired,
  navigation: PropTypes.shape({ // eslint-disable-line
    navigate: PropTypes.func,
    setParams: PropTypes.func
  }).isRequired,
  setNavigator: PropTypes.func.isRequired,
  setUserPosition: PropTypes.func.isRequired,
  fetchParkingTypes: PropTypes.func.isRequired,
  fetchParkingTakenForSlots: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);