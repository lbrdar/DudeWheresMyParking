import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, ScrollView, Switch } from 'react-native';
import { Divider } from 'react-native-material-ui';
import ModalDropdown from 'react-native-modal-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, RadioButton } from '../../common';
import * as Actions from '../../common/actions';
import styles from './SettingsStyles';

function mapStateToProps(state) {
  return {
    settings: state.settingsReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.periods = [
      { label: '30 seconds', value: 30*1000 },
      { label: '1 minute', value: 60*1000 },
      { label: '5 minutes', value: 5*60*1000 },
      { label: '10 minutes', value: 10*60*1000 }];

    this.state = {
      fetchOnPositionChange: props.settings.fetchOnPositionChange,
      fetchPeriodically: props.settings.fetchPeriodically,
      fetchingPeriod: this.periods.find(period => period.value === props.settings.fetchingPeriod),
      radius: props.settings.radius
    };
  }

  setFetchingPeriod = (index) => {
    this.setState({ fetchingPeriod: this.periods[index] });
    this.props.setFetchingPeriod(this.periods[index].value);
  };
  setFetchOnPositionChange = () => {
    this.props.toggleFetchOnPositionChange();
    this.setState({ fetchOnPositionChange: !this.state.fetchOnPositionChange });
  };
  setFetchPeriodically = () => {
    this.props.toggleFetchPeriodically();
    this.setState({ fetchPeriodically: !this.state.fetchPeriodically });
  };
  handleTypeChange = (type) => this.props.setMapType(type);

  handleRadiusChange = (value) => {
    const number = parseInt(value);
    if (!number && value !== '') {
      alert('Please use only numbers');         // eslint-disable-line no-undef
      return;
    }
    this.setState({ radius: number || '' });
  };

  handleRadiusSet = () => {
    let radius = this.state.radius;
    if (radius < 50) {
      alert('Minimum radius is 50 meters.');    // eslint-disable-line no-undef
      this.setState({ radius: 50 });
      radius = 50;
    } else if (radius > 500) {
      alert('Maximum radius is 500 meters.');   // eslint-disable-line no-undef
      this.setState({ radius: 500 });
      radius = 500;
    }
    this.props.setRadius(radius);
  };

  render() {
    const { fetchOnPositionChange, fetchPeriodically, fetchingPeriod, radius } = this.state;
    const selectedType = this.props.settings.mapType;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.settingContainer}>
          <Text style={styles.name}>Map Type</Text>
          <Text style={styles.description}>
            Display type of the map
          </Text>
          <View style={styles.content}>
            <RadioButton
              label="Standard"
              checked={selectedType === 'standard'}
              value="standard"
              style={styles.radioButton}
              onPress={selected => this.handleTypeChange(selected)}
            />
            <Divider />
            <RadioButton
              label="Satellite"
              checked={selectedType === 'satellite'}
              value="satellite"
              style={styles.radioButton}
              onPress={selected => this.handleTypeChange(selected)}
            />
            <Divider />
            <RadioButton
              label="Hybrid"
              checked={selectedType === 'hybrid'}
              value="hybrid"
              style={styles.radioButton}
              onPress={selected => this.handleTypeChange(selected)}
            />
          </View>
        </View>
        <Divider />
        <View style={styles.settingContainer}>
          <Text style={styles.name}>Radius</Text>
          <Text style={styles.description}>
            Radius (in meters) around selected location in which free parking places will be shown.
          </Text>
          <View style={[styles.content, styles.radiusContainer]}>
            <TextInput
              keyboardType='numeric'
              maxLength={3}
              style={styles.radiusInput}
              value={radius.toString()}
              onChangeText={this.handleRadiusChange}
              onEndEditing={this.handleRadiusSet}
            />
            <Text style={styles.unitLabel}>meters</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.settingContainer}>
          <Text style={styles.name}>Data fetching</Text>
          <Text style={styles.description}>
            Settings to determine when new empty parking spots data should be fetched from server.
          </Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <Switch
                style={styles.switch}
                value={fetchOnPositionChange}
                onValueChange={this.setFetchOnPositionChange}
              />
              <Text style={styles.switchLabel}>Fetch data when user&#39;s position change</Text>
            </View>
            <View style={styles.row}>
              <Switch
                style={styles.switch}
                value={fetchPeriodically}
                onValueChange={this.setFetchPeriodically}
              />
              <Text style={styles.switchLabel}>Fetch data periodically</Text>
            </View>
            { fetchPeriodically &&
              <View style={styles.insetRow}>
                <Text style={styles.dropdownLabel}>Period: </Text>
                <ModalDropdown
                  style={styles.dropdownContainer}
                  dropdownStyle={styles.dropdown}
                  defaultIndex={this.periods.indexOf(fetchingPeriod)}
                  defaultValue={fetchingPeriod.label}
                  options={this.periods.map(period => period.label)}
                  onSelect={this.setFetchingPeriod}
                />
              </View>
            }

          </View>
        </View>
      </ScrollView>
    );
  }
}

Settings.navigationOptions = () => ({
  header: <ScreenHeader screenName="Settings" />
});

Settings.propTypes = {
  settings: PropTypes.shape({
    fetchOnPositionChange: PropTypes.bool.isRequired,
    fetchPeriodically: PropTypes.bool.isRequired,
    fetchingPeriod: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    mapType: PropTypes.string.isRequired
  }).isRequired,
  setMapType: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired,
  toggleFetchOnPositionChange: PropTypes.func.isRequired,
  toggleFetchPeriodically: PropTypes.func.isRequired,
  setFetchingPeriod: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);