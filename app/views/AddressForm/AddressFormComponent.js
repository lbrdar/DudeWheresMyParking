import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, Button } from '../../common';
import config from '../../config';
import styles from './AddressFormStyles';
import * as Actions from '../../common/actions';

function mapStateToProps(state) {
  return {
    userPosition: state.userPositionReducers,
    auth: state.authReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
      latitude: null,
      longitude: null,
      address: null,
      error: ''
    };

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
    this.allowedReverseGeocodingResults = ['street_address'];
  }

  componentWillMount() {
    this.props.setParams({ onAddClick: this.onAddClick }, this.props.navigation.state.key);
  }

  onAddClick = () => {
    const { latitude, longitude, address, label} = this.state;
    if (this.isValid()) {
      this.props.addUserAddress({ latitude, longitude }, address, label, this.props.auth.userId);
      this.props.goBack();
    }
  };

  onSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      this.setState({ latitude: lat, longitude: lng, address: details.formatted_address });
    }
  };

  setLabel = (label) => this.setState({ label });

  isValid = () => {
    const { latitude, longitude, address, label} = this.state;

    if (!latitude || !longitude || !address) {
      this.setState({ error: 'Please enter valid address'});
      return false;
    }

    if (!label) {
      this.setState({ error: 'Please enter label for this address'});
      return false;
    }

    return true;
  };

  renderRow = (rowData, details) => {
    if (rowData.isPredefinedPlace) {
      return (rowData.formatted_address ? `${rowData.description}: ${rowData.formatted_address}` : rowData.description);
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
      <ScrollView style={styles.wrapper}>
        <Text style={styles.errorMsg}>{this.state.error}</Text>
        <View style={styles.contentRow}>
          <Text style={styles.name}>Label</Text>
          <TextInput
            style={styles.input}
            value={this.state.label}
            placeholder="e.g. Home, Work,.."
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={this.setLabel}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>Address</Text>
          <GooglePlacesAutocomplete
            placeholder='Enter full address'
            minLength={2} // minimum length of text to search
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
            debounce={250}
            renderLeftButton={() => <Icon name="place" color="black" size={30} style={styles.placesIcon} />}
            styles={styles}
          />
        </View>
      </ScrollView>
    );
  }
}

AddressForm.navigationOptions = ({ navigation: { state: { params } } }) => ({
  header: <ScreenHeader
    screenName="Add new address"
    rightElement={
      <Button
        primary={false}
        accent
        label="Add"
        onPress={params ? params.onAddClick : () => {}}
      />
    }
  />
});

AddressForm.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        onAddClick: PropTypes.func
      }),
      key: PropTypes.string.isRequired
    })
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  addUserAddress: PropTypes.func.isRequired,
  userPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);