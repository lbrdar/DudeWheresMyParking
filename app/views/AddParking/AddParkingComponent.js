import React, { Component, PropTypes } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { ScreenHeader, RadioButton, Button } from '../../common';
import * as Actions from '../../common/actions';
import SelectOnMap from './SelectOnMapComponent';
import styles from './AddParkingStyles';

function mapStateToProps(state) {
  return {
    userPosition: state.userPositionReducers,
    data: state.dataReducers,
    settings: state.settingsReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AddParking extends Component {  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      position: {
        latitude: null,
        longitude: null
      },
      typeId: null,
      price: '0',
      keyboardOpen: false,
      showMap: false
    }
  }

  componentWillMount() {
    if (!this.props.data.types) this.props.fetchParkingTypes();
    this.props.setNavigator(this.props.navigation);
  }

  onMapSelect = (e) => this.setState({ position: e.nativeEvent.coordinate, showMap: false });

  handlePriceChange = (value) => {
    const clearValue = value && value.replace(',', '.');  // parseFloat accepts only dot notation, not comma
    const number = parseFloat(clearValue);
    if (!number && value !== '') {
      alert('Please use only numbers');         // eslint-disable-line no-undef
      return;
    }
    this.setState({ price: clearValue });
  };

  renderType = (type) => {
    return (
      <View key={type.id}>
        <RadioButton
          label={type.label}
          checked={this.state.typeId === type.id}
          value={type.id}
          onPress={() => this.setState({ typeId: type.id })}
        />
        <Divider />
      </View>
    );
  };

  render() {
    const { position, price, keyboardOpen, showMap } = this.state;
    const { userPosition, data, settings } = this.props;

    if (showMap) {
      return <SelectOnMap center={userPosition.position} mapType={settings.mapType} onSelect={this.onMapSelect} />
    }

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={[styles.container, { justifyContent: keyboardOpen ? 'flex-end' : 'flex-start' }]}
      >
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.name}>Position</Text>
            <View style={styles.columnContainer}>
              <Text>Latitude: {position.latitude}</Text>
              <Text>Longitude: {position.longitude}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button label='Use my location' onPress={() => this.setState({ position: userPosition.position })} />
            <Button label='Select on map' onPress={() => this.setState({ showMap: true })} />
          </View>
        </View>
        <View>
          <Text style={styles.name}>Type</Text>
          <View style={styles.content}>
            { data.types ? data.types.map(this.renderType) : null }
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>Price per hour</Text>
          <View style={styles.columnContainer}>
            <TextInput
              keyboardType='numeric'
              placeholder='Price per hour'
              value={price}
              style={styles.priceInput}
              onFocus={() => this.setState({ keyboardOpen: true })}
              onBlur={() => this.setState({ keyboardOpen: false })}
              onChangeText={this.handlePriceChange}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddParking.navigationOptions = () => ({
  header: <ScreenHeader screenName="Add parking spot" />
});

AddParking.propTypes = {
  data: PropTypes.shape({
    types: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  settings: PropTypes.shape({
    mapType: PropTypes.string.isRequired
  }).isRequired,
  userPosition: PropTypes.shape({
    position: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  setNavigator: PropTypes.func.isRequired,
  fetchParkingTypes: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);