import React, { Component, PropTypes } from 'react';
import { Text, View, TextInput, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { ScreenHeader, Button } from '../../common';
import * as Actions from '../../common/actions';
import SelectOnMap from './SelectOnMapComponent';
import styles from './AddParkingStyles';

function mapStateToProps(state) {
  return {
    userPosition: state.userPosition,
    data: state.data,
    settings: state.settings,
    auth: state.auth
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AddParking extends Component {
  constructor() {
    super();
    this.state = {
      position: {
        latitude: null,
        longitude: null
      },
      typeId: null,
      price: '0',
      showMap: false,
      error: ''
    }
  }

  componentWillMount() {
    if (!this.props.data.types) this.props.fetchParkingTypes();
    this.props.setParams({ onAddClick: this.onAddClick }, this.props.navigation.state.key);
  }

  onAddClick = () => {
    const { position, typeId, price } = this.state;
    if (this.isValid()) {
      this.props.addParkingSpot(position, typeId, price, this.props.auth.userId);
      this.props.goBack();
    }
  };

  onMapSelect = (e) => this.setState({ position: e.nativeEvent.coordinate, showMap: false });

  setType = (index) => this.setState({ typeId: this.props.data.types[index].id});

  handlePriceChange = (value) => {
    const clearValue = value && value.replace(',', '.');  // parseFloat accepts only dot notation, not comma
    const number = parseFloat(clearValue);
    if (!number && value !== '') {
      alert('Please use only numbers');         // eslint-disable-line no-undef
      return;
    }
    this.setState({ price: clearValue });
  };

  isValid = () => {
    const { position : { latitude, longitude }, typeId } = this.state;

    if (!latitude || !longitude) {
      this.setState({ error: 'Please provide position of parking spot'});
      return false;
    }

    if (!typeId) {
      this.setState({ error: 'Please select type of parking'});
      return false;
    }

    return true;
  };

  render() {
    const { position, price, showMap } = this.state;
    const { userPosition, data, settings } = this.props;

    if (showMap) {
      return <SelectOnMap center={userPosition} mapType={settings.mapType} onSelect={this.onMapSelect} />
    }

    return (
      <ScrollView style={styles.container}>
        { this.state.error ? <Text style={styles.errorMsg}>{this.state.error}</Text> : null }
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name}>Position</Text>
            <View>
              <Text style={styles.position}>Latitude: {position.latitude && position.latitude.toFixed(6)}</Text>
              <Text style={styles.position}>Longitude: {position.longitude && position.longitude.toFixed(6)}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button label='Use my location' onPress={() => this.setState({ position: userPosition })} />
            <Button label='Select on map' onPress={() => this.setState({ showMap: true })} />
          </View>
        </View>
        <Divider />
        <View style={[styles.row, styles.content]}>
          <Text style={styles.name}>Type</Text>
          <View style={styles.value}>
            <ModalDropdown
              style={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              dropdownTextStyle={styles.dropdownOpenText}
              dropdownStyle={styles.dropdown}
              options={data.types && data.types.length && data.types.map(type => type.label)}
              onSelect={this.setType}
            />
          </View>
        </View>
        <Divider />
        <View style={[styles.row, styles.content]}>
          <Text style={styles.name}>Price per hour</Text>
          <View style={styles.value}>
            <TextInput
              keyboardType='numeric'
              placeholder='Price per hour'
              value={price}
              style={styles.priceInput}
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={this.handlePriceChange}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

AddParking.navigationOptions = ({ navigation: { state: { params } } }) => ({
  header: <ScreenHeader
    screenName="Add parking spot"
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

AddParking.propTypes = {
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    types: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired
  }).isRequired,
  settings: PropTypes.shape({
    mapType: PropTypes.string.isRequired
  }).isRequired,
  userPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        onAddClick: PropTypes.func
      }),
      key: PropTypes.string.isRequired
    }).isRequired,
    setParams: PropTypes.func.isRequired
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  fetchParkingTypes: PropTypes.func.isRequired,
  addParkingSpot: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);