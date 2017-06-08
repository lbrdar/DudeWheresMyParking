import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import { Avatar, Drawer } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../common/actions';
import Logo from '../../images/logo.png';

function mapStateToProps(state) {
  return {
    navigation: state.navigationReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class DrawerContentComponent extends Component {

  onSelect = (routeName) => {
    const { closeDrawer, navigate, navigation: { navigator } } = this.props;

    closeDrawer();
    if (navigator.state.routeName !== routeName) {
      navigate(routeName);
    }
  };

  logout = () => {
    this.props.setIsLoggedIn(false);
    this.onSelect('Login');
  };

  render() {
    const { navigator } = this.props.navigation;
    const activeRoute = navigator && navigator.state.routeName;
    return (
      <Drawer>
        <Drawer.Header >
          <Drawer.Header.Account
            avatar={<Avatar image={<Image source={Logo} />} />}
          />
        </Drawer.Header>
        <Drawer.Section
          divider
          items={[
            { icon: 'map',
              value: 'Map',
              active: activeRoute === 'Map',
              onPress: () => this.onSelect('Map')
            },
            { icon: 'location-searching',
              value: 'Search by address',
              active: activeRoute === 'PlacesSearch',
              onPress: () => this.onSelect('PlacesSearch')
            },
            { icon: 'add-location',
              value: 'Add free parking spot',
              active: activeRoute === 'AddParking',
              onPress: () => this.onSelect('AddParking')
            },
          ]}
        />
        <Drawer.Section
          divider
          items={[
            { icon: 'settings',
              value: 'Settings',
              active: activeRoute === 'Settings',
              onPress: () => this.onSelect('Settings')
            },
            { icon: 'exit-to-app',
              value: 'Log out',
              onPress: () => this.logout()
            }
          ]}
        />
      </Drawer>
    );
  }
}

DrawerContentComponent.propTypes = {
  navigation: PropTypes.shape({
    navigator: PropTypes.shape({})
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentComponent);