import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, ScreenHeader } from '../../common';
import config from '../../config';
import styles from './PlacesSearchStyles';
import * as Actions from '../../common/actions';

function mapStateToProps(state) {
  return {
    userPosition: state.userPosition,
    data: state.data
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}


function generatePredefinedPlaces(userAddresses) {
  if (!userAddresses.length) return [];

  return userAddresses.map(address => ({
    description: address.label,
    formatted_address: address.address,
    geometry: { location: { lat: address.latitude, lng: address.longitude } }
  }));
}

class PlacesSearch extends Component {
  constructor(props) {
    super(props);

    this.placesQuery = {
      key: config.googleAPIKey,
      language: 'en',
      types: 'address',
      radius: 10000,  // bias results to 10km around user's position
      location:  props.userPosition,
    };
    this.reverseGeocodingQuery = {
      language: 'en',
    };
    this.allowedReverseGeocodingResults = ['street_address', 'route', 'intersection', 'neighborhood', 'sublocality',
                                            'locality', 'administrative_area_level_3', 'postal_code',
                                            'airport', 'parking' ];

    this.predefinedPlaces = generatePredefinedPlaces(props.data.userAddresses);
  }

  onSelect = (data, details) => {
    const { goBack, navigation: { state } } = this.props;

    if (data && data.geometry && data.geometry.location) {
      const { lat, lng } = data.geometry.location;
      if (state.params) state.params.onPlaceSelect({ latitude: lat, longitude: lng });
      goBack();
    } else if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      if (state.params) state.params.onPlaceSelect({ latitude: lat, longitude: lng });
      goBack();
    }
  };

  renderRow = (rowData, details) => {

    if (rowData.isPredefinedPlace) {
      return (rowData.formatted_address ? `${rowData.description.toUpperCase()}: ${rowData.formatted_address}` : rowData.description);
    } else if (rowData.formatted_address) {
      return rowData.formatted_address;
    } else if (details && details.formatted_address) {
      return details.formatted_address;
    } else if (rowData.description) {
      return rowData.description;
    }
    return JSON.stringify(rowData);
  };

  render() {
    return (
      <Container>
        <GooglePlacesAutocomplete
          placeholder='Find parking near...'
          minLength={2} // minimum length of text to search
          autoFocus
          listViewDisplayed // list predefined locations right away (if false, will render only when search is focused)
          fetchDetails
          renderDescription={this.renderRow}
          onPress={this.onSelect}
          query={this.placesQuery}
          currentLocation // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Use my location"
          nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use for nearBy search: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={this.reverseGeocodingQuery}
          filterReverseGeocodingByTypes={this.allowedReverseGeocodingResults}
          predefinedPlaces={this.predefinedPlaces}

          debounce={250}
          renderLeftButton={() => <Icon name="place" color="black" size={30} style={styles.placesIcon} />}
          styles={styles}
        />
      </Container>
    );
  }
}

PlacesSearch.navigationOptions = () => ({
  header: <ScreenHeader screenName="Address search" />
});

PlacesSearch.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        onPlaceSelect: PropTypes.func
      })
    })
  }).isRequired,
  data: PropTypes.shape({
    userAddresses: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  userPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);