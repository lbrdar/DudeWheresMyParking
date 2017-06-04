import React, { Component, PropTypes } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-ui';
import { ScreenHeader, RadioButton } from '../../common';
import * as Actions from '../../common/actions';
import styles from './AddParkingStyles';

function mapStateToProps(state) {
  return {
    userPosition: state.userPositionReducers,
    data: state.dataReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class AddParking extends Component {  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      keyboardOpen: false,
      typeId: null,
      price: 0
    }
  }

  componentWillMount() {
    this.props.setNavigator(this.props.navigation);
  }

  handlePriceChange = (value) => {
    const number = parseFloat(value);
    if (!number && value !== '') {
      alert('Please use only numbers');         // eslint-disable-line no-undef
      return;
    }
    this.setState({ price: number || '' });
  };

  renderType = (type) => {
    return (
      <View key={type.id}>
        <RadioButton
          label={type.label}
          checked={this.state.typeId === type.id}
          value={type.id}
          onPress={selected => this.handleTypeChange(selected)}
        />
        <Divider />
      </View>
    );
  };

  render() {
    const { keyboardOpen, price } = this.state;
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={[styles.container, { justifyContent: keyboardOpen ? 'center' : 'flex-start' }]}
      >
        <View>
          <Text style={styles.name}>Parking Type</Text>
          <View style={styles.content}>
            { this.props.data.types.map(this.renderType) }
          </View>
        </View>
        <View>
          <Text style={styles.name}>Parking price per hour</Text>
          <View style={[styles.content, styles.priceContainer]}>
            <TextInput
              keyboardType='numeric'
              style={styles.priceInput}
              placeholder='Price per hour'
              value={price.toString()}
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
  navigation: PropTypes.shape({}).isRequired,
  setNavigator: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);