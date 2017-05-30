import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Toolbar } from 'react-native-material-ui';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container } from '../../common';
import config from '../../config';
import styles from './PlacesSearchStyle';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class PlacesSearch extends Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.placesQuery = {
      key: config.googleAPIKey,
      language: 'en',
      types: 'address',
      radius: 10000,  // bias results to 10km around user's position
      location:  props.navigation.state && props.navigation.state.params.userPosition,
    };
    this.reverseGeocodingQuery = {
      language: 'en',
    };
    this.allowedReverseGeocodingResults = ['street_address', 'route', 'intersection', 'neighborhood', 'sublocality',
                                            'locality', 'administrative_area_level_3', 'postal_code',
                                            'airport', 'parking' ];
  }

  onSelect = (data) => { // eslint-disable-line
    const { goBack, state } = this.props.navigation;

    if (data && data.geometry && data.geometry.location) {
      const { lat, lng } = data.geometry.location;
      if (state.params) state.params.onPlaceSelect({ latitude: lat, longitude: lng });
      goBack();
    }
  };

  renderRow = (rowData) => {
    if (rowData.isPredefinedPlace) {
      return (rowData.formatted_address ? `${rowData.description}: ${rowData.formatted_address}` : rowData.description);
    }
    return rowData.formatted_address;
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
          predefinedPlaces={[homePlace, workPlace]}

          debounce={200}
          renderLeftButton={() => <Icon name="place" color="black" size={30} style={styles.placesIcon} />}
          styles={styles}
        />
      </Container>
    );
  }
}

PlacesSearch.navigationOptions = ({ navigation }) => ({
  header: <Toolbar
    centerElement="Address search"
    leftElement="arrow-back"
    onLeftElementPress={navigation.goBack}
  />
});

PlacesSearch.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        userPosition: PropTypes.shape({})
      })
    })
  }).isRequired
};

export default PlacesSearch;