import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, Button, Loading } from '../../common';
import * as Actions from '../../common/actions';
import styles from './AuthStyles';

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      loading: false,
      error: ''
    }
  }

  onRegisterPress = () => {
    if (this.isValid()) {
      this.setState({ loading: true });
      this.props.register(this.state.username, this.state.password);  // TODO: handle fail (remove loading, show snackbar)
    }
  };

  setUsername = (value) => this.setState({ username: value });
  setPassword = (value) => this.setState({ password: value });
  setPassword2 = (value) => this.setState({ password2: value });

  isValid = () => {
    const { username, password, password2 } = this.state;

    if (!username || !password || !password2) {
      this.setState({ error: 'All fields are required' });
      return false;
    }
    if (password !== password2) {
      this.setState({ error: 'Passwords don\'t match' });
      return false;
    }

    return true;
  };

  render() {
    const { username, password, password2, loading, error } = this.state;

    if (loading) return <Loading />;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.description}>
            Before proceeding to the application, please register by entering your username and password to fields below.
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Username"
            value={username}
            onChangeText={this.setUsername}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            value={password}
            onChangeText={this.setPassword}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            style={styles.input}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Repeat password"
            value={password2}
            onChangeText={this.setPassword2}
          />
          <Text style={styles.errorMsg}>{error}</Text>
          <Button label='Register' onPress={this.onRegisterPress} style={{ container: styles.button }} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Register.navigationOptions = () => ({
  header: <ScreenHeader screenName="Register" allowGoBack={false} />
});

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);