/* eslint-disable no-console, no-undef */
import React, { PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geoLocationUtils, API } from '../../utils';
import { Loading } from '../../common';
import MapHeader from './MapHeader';
import MarkerCalloutModal from './MarkerCalloutModal';
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
      selectedParkingSpot: null
    };

    this.watchID = null;
    this.timerID = null;
  }

  componentWillMount() {
    this.props.fetchParkingTypes();
    this.props.fetchParkingTakenForSlots();
    this.props.setParams({ onRefresh: this.onRefresh, onPlaceSelect: this.onPlaceSelect }, this.props.navigation.state.key);
  }
  componentDidMount() {
    if (this.props.settings.fetchOnPositionChange) {
      this.watchID = navigator.geolocation.watchPosition(
        this.updateUserPosition,
        err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
        { enableHighAccuracy: true, distanceFilter: 1 }
      );
    }
    if (this.props.settings.fetchPeriodically) {
      this.timerID = this.setInterval(() => this.getParkingSpots(), this.props.settings.fetchingPeriod); // auto refresh
    }
  }
  componentWillReceiveProps(nextProps) {
    if ((nextProps.settings.radius !== this.props.settings.radius)) {
      this.getParkingSpots(undefined, nextProps.settings.radius);
    }
    if ((nextProps.settings.fetchingPeriod !== this.props.settings.fetchingPeriod)) {
      this.clearInterval(this.timerID);
      this.timerID = this.setInterval(() => this.getParkingSpots(), nextProps.settings.fetchingPeriod);
    }
    if (nextProps.settings.fetchPeriodically !== this.props.settings.fetchPeriodically) {
      if (nextProps.settings.fetchPeriodically) {
        this.timerID = this.setInterval(() => this.getParkingSpots(), nextProps.settings.fetchingPeriod);
      } else {
        this.clearInterval(this.timerID);
      }
    }
    if (nextProps.settings.fetchOnPositionChange !== this.props.settings.fetchOnPositionChange) {
      if (nextProps.settings.fetchOnPositionChange) {
        this.watchID = navigator.geolocation.watchPosition(
          this.updateUserPosition,
          err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
          { enableHighAccuracy: true, distanceFilter: 1 }
        );
      } else {
        navigator.geolocation.clearWatch(this.watchID);
      }
    }
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.clearInterval(this.timerID);
  }

  onRefresh = () => {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      this.updateUserPosition,
      err => console.log('Error in navigator: ', err),    // TODO: add denied location handling
      { enableHighAccuracy: true }
    );

    if (!this.state.findParkingNearUser) {  // if it's true, it will be handled when new userPosition is received in updateUserPosition
      this.getParkingSpots();
    }
  };

  onPlaceSelect = ({ latitude, longitude }) => {
    this.setState({
      region: this.getRegion(latitude, longitude, this.props.settings.radius),
      parkingFindingLocation: { latitude, longitude },
      findParkingNearUser: false
    });
    this.getParkingSpots({ latitude, longitude });
  };

  onRegionChangeComplete = region => this.setState({ region });
  onMarkerPress = (id) => {
    API.getParkingSpot(id)
      .then(data => this.setState({ selectedParkingSpot: data }))
      .catch(err => console.log('Failed to retrieve parking spot. ', err));
  };
  onModalClose = () => this.setState({ selectedParkingSpot: null });
  onTakeParkingSpot = (id, userId, takenFor_id) => {
    API.takeParkingSpot(id, userId, takenFor_id)
       .catch(err => console.log('Failed to take parking spot. ', err));
  };


  getParkingSpots = (location = this.state.parkingFindingLocation, radius = this.props.settings.radius) => {
    API.getParkingSpotsNear(location, radius)
       .then(parkingSpots => ( parkingSpots && this.setState({ parkingSpots }) ))
       .catch(err => console.log('Failed to retrieve parking spots. ', err));
  };
  getRegion = (latitude, longitude, radius) => {
    const circleBounds = geoLocationUtils.getCircleBounds({ latitude, longitude }, radius);

    return geoLocationUtils.calculateDelta([...circleBounds], { latitude, longitude });
  };
  updateUserPosition = ({ coords: { latitude, longitude } }) => {
    this.props.setUserPosition(latitude, longitude);

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

  determineMarkerColor = (created, isTaken) => {
    const deltaMs = moment() - moment(created);
    if (isTaken) {
      return 'blue';
    } else if (deltaMs < 15*60*1000) { // 15 min
      return 'green';
    } else if (deltaMs < 30*60*1000) { // 30 min
      return 'yellow';
    } else if (deltaMs < 24*60*60*1000) { // 24h
      return 'red';
    } else {
      return 'gray';
    }
  };


  renderMarker = ({ id, latitude, longitude, created, taken }) => {
    return (
      <MapView.Marker
        key={id}
        pinColor={this.determineMarkerColor(created, !!taken)}
        coordinate={{ latitude, longitude }}
        onPress={() => this.onMarkerPress(id)}
      />
    )
  };
  render() {
    const { loading, region, parkingSpots, parkingFindingLocation, selectedParkingSpot } = this.state;
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
        { selectedParkingSpot ?
          <MarkerCalloutModal
            parkingSpot={selectedParkingSpot}
            closeModal={this.onModalClose}
            takeParkingSpot={this.onTakeParkingSpot}
          /> : null
        }
      </View>

    );
  }
}

Map.navigationOptions = ({ navigation }) => ({
  header: <MapHeader navigation={navigation} />
});

Map.propTypes = {
  settings: PropTypes.shape({
    fetchOnPositionChange: PropTypes.bool.isRequired,
    fetchPeriodically: PropTypes.bool.isRequired,
    fetchingPeriod: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    mapType: PropTypes.string.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  setParams: PropTypes.func.isRequired,
  setUserPosition: PropTypes.func.isRequired,
  fetchParkingTypes: PropTypes.func.isRequired,
  fetchParkingTakenForSlots: PropTypes.func.isRequired,
};

ReactMixin(Map.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Map);