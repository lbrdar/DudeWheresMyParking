import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, Button } from '../../common';
import * as Actions from '../../common/actions';
import styles from './AccountStyles';

function mapStateToProps(state) {
  return {
    auth: state.authReducers,
    data: state.dataReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.auth.username
    }
  }

  componentWillMount() {
    this.props.fetchPoints(this.props.auth.userId); // update points
  }

  onAddAddress = () => this.props.navigate('AddressForm', { handleSave: this.saveAddress });

  setUsername = (value) => this.setState({ username: value });

  saveUsername = () => {
    const { username } = this.state;
    if (username){
      this.props.setUsername(this.props.auth.userId, username);
    } else {
      alert('Username can\'t be empty!');   // eslint-disable-line no-undef
      this.setState({ username: this.props.auth.username });
    }
  };

  saveAddress = (position, address, label) => {
    this.props.addUserAddress(position, address, label, this.props.auth.userId)
  };

  renderAddress = (address, key) => (
    <View style={styles.addressRow} key={key}>
      <View style={styles.address}>
        <Text style={styles.addressLabel}>{address.label}: </Text>
        <Text style={styles.addressValue}>{address.address}</Text>
      </View>
    </View>
  );

  render() {
    const { username } = this.state;
    const { auth, data } = this.props;

    return (
      <ScrollView>
        <View style={styles.contentRow}>
          <Text style={styles.name}>Username</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            value={username}
            onChangeText={this.setUsername}
            onEndEditing={this.saveUsername}
          />
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.name}>Points</Text>
          <Text style={styles.input}>{auth.points}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name}>Addresses</Text>
            <Button accent label="+ Add" onPress={this.onAddAddress} />
          </View>

          <Text style={styles.description}>
            These are your addresses that will be available for you to select when searching for parking spots.
          </Text>
          <View style={styles.listContainer}>
            { data.userAddresses.length ? data.userAddresses.map(this.renderAddress) : null }
          </View>
        </View>
      </ScrollView>
    );
  }
}

Account.navigationOptions = () => ({
  header: <ScreenHeader screenName="Account" />
});

Account.propTypes = {
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    points: PropTypes.number
  }).isRequired,
  data: PropTypes.shape({
    userAddresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  addUserAddress: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);