import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenHeader, Button, Loading } from '../../common';
import * as Actions from '../../common/actions';
import styles from './AuthStyles';

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loading: false,
      error: ''
    }
  }

  onLoginPress = () => {
    if (this.isValid()) {
      this.setState({ loading: true });
      this.props.login(this.props.auth.userId, this.state.password);  // TODO: handle fail (remove loading, show snackbar)
    }
  };

  setPassword = (value) => this.setState({ password: value });

  isValid = () => {
    const { password } = this.state;

    if (password === '') {
      this.setState({ error: 'Please enter password' });
      return false;
    }

    return true;
  };

  render() {
    const { password, loading, error } = this.state;

    if (loading) return <Loading />;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.description}>
            Before proceeding to the application, please login by entering your password to field below.
          </Text>
        </View>
        <View style={styles.form}>
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
          <Text style={styles.errorMsg}>{error}</Text>
          <Button label='Login' onPress={this.onLoginPress} style={{ container: styles.button }} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Login.navigationOptions = () => ({
  header: <ScreenHeader screenName="Login" allowGoBack={false} />
});

Login.propTypes = {
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);