import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import { Avatar, Drawer } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../common/actions';
import Logo from '../../images/logo.png';
import parking from '../../images/parking-background.png';
import styles from './DrawerStyles';

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
    const { closeDrawer, navigate, navigation } = this.props;
    const activeRoute = navigation.routes[navigation.routes.length - 1].routeName;

    closeDrawer();
    if (activeRoute !== routeName) {
      navigate(routeName);
    }
  };

  logout = () => {
    this.props.setIsLoggedIn(false);
    this.onSelect('Login');
  };

  render() {
    const { navigation } = this.props;
    const activeRoute = navigation.routes[navigation.routes.length - 1].routeName;

    return (
      <Drawer>
        <Drawer.Header >
          <Image source={parking} style={styles.headerBackground}>
            <Avatar
              image={<Image source={Logo} resizeMode="cover" style={styles.avatarContent} />}
              style={{ container: styles.avatar, content: styles.avatarContent }}
              size={80}
            />
          </Image>
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
            { icon: 'person',
              value: 'Account',
              active: activeRoute === 'Account',
              onPress: () => this.onSelect('Account')
            },
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
    state: PropTypes.shape({})
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentComponent);