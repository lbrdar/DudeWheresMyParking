import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, RadioButton } from '../../common';
import * as Actions from '../../common/actions';
import styles from './SettingsStyle';

function mapStateToProps(state) {
  return {
    settings: state.settingsReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Settings extends Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.settings.mapType,
      radius: props.settings.radius,
      keyboardOpened: false
    }
  }

  componentWillMount() {
    this.props.setNavigator(this.props.navigation);
  }

  handleTypeChange = (type) => {
    this.setState({ selectedType: type });
    this.props.setMapType(type);
  };

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
    const { selectedType, radius, keyboardOpened } = this.state;
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={[styles.container, { justifyContent: keyboardOpened ? 'center' : 'flex-start' }]}
      >
        <View>
          <Text style={styles.name}>Map Type</Text>
          <Text style={styles.description}>
            Display type of the map
          </Text>
          <View style={styles.content}>
            <RadioButton
              label="Standard"
              checked={selectedType === 'standard'}
              value="standard"
              onPress={selected => this.handleTypeChange(selected)}
            />
            <Divider />
            <RadioButton
              label="Satellite"
              checked={selectedType === 'satellite'}
              value="satellite"
              onPress={selected => this.handleTypeChange(selected)}
            />
            <Divider />
            <RadioButton
              label="Hybrid"
              checked={selectedType === 'hybrid'}
              value="hybrid"
              onPress={selected => this.handleTypeChange(selected)}
            />
          </View>
        </View>
        <View>
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
              onFocus={() => this.setState({ keyboardOpened: true })}
              onBlur={() => this.setState({ keyboardOpened: false })}
              onChangeText={this.handleRadiusChange}
              onEndEditing={this.handleRadiusSet}
            />
            <Text style={styles.unitLabel}>meters</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Settings.navigationOptions = () => ({
  header: <ScreenHeader screenName="Settings" />
});

Settings.propTypes = {
  settings: PropTypes.shape({
    radius: PropTypes.number.isRequired,
    mapType: PropTypes.string.isRequired
  }).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  setNavigator: PropTypes.func.isRequired,
  setMapType: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);