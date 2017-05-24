import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Toolbar } from 'react-native-material-ui';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container } from '../../common';
import config from '../../config';
import styles from './PlacesSearchStyle';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const placesQuery = {
  key: config.googleAPIKey,
  language: 'en',
  types: 'address',
};
const reverseGeocodingQuery = {
  language: 'en',
};
const allowedReverseGeocodingResults = ['street_address', 'route', 'intersection', 'neighborhood', 'sublocality',
                                        'locality', 'administrative_area_level_3', 'postal_code',
                                        'airport', 'parking' ];

class PlacesSearch extends Component {  // eslint-disable-line react/prefer-stateless-function

  onSelect = (data) => { // eslint-disable-line
    // TODO: use data as map center + query API to retrieve parking spots near it
    this.props.navigation.goBack();
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
          fetchDetails={false}
          renderDescription={this.renderRow}
          onPress={this.onSelect}
          query={placesQuery}
          currentLocation // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Use my location"
          nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use for nearBy search: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={reverseGeocodingQuery}
          filterReverseGeocodingByTypes={allowedReverseGeocodingResults}
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
    goBack: PropTypes.func
  }).isRequired
};

export default PlacesSearch;