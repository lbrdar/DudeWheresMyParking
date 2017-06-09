import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader } from '../../common';
import * as Actions from '../../common/actions';
import styles from './AccountStyles';

function mapStateToProps(state) {
  return {
    auth: state.authReducers
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
    this.props.setNavigator(this.props.navigation);
    this.props.fetchPoints(this.props.auth.userId); // update points
  }

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

  render() {
    const { username } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={this.setUsername}
            onEndEditing={this.saveUsername}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>Points</Text>
          <Text style={styles.input}>{this.props.auth.points}</Text>
        </View>
      </KeyboardAvoidingView>
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
  navigation: PropTypes.shape({}).isRequired,
  setNavigator: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);