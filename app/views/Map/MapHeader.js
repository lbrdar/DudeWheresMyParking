import React, { PropTypes } from 'react'
import {
  IconToggle,
  COLOR,
  Toolbar
} from 'react-native-material-ui';


class MapHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    this.menuOptions = [ 'Change map type' ];
  }

  handleMenuSelect = (e) => {
      if(e.action === 'menu') {
        switch (e.index) {
          case 0:
            this.props.navigation.setParams({ openTypeModal: true });
            break;
          default:
            break;
        }
      }
  };

  render() {
    const { navigation: { state, goBack, navigate } } = this.props;

    return (
      <Toolbar
        centerElement="Map"
        leftElement="arrow-back"
        onLeftElementPress={goBack}
        rightElement={{
          actions: [
            <IconToggle
              color="white"
              underlayColor={COLOR.grey400}
              key="refresh"
              name="refresh"
              onPress={state.params && state.params.onRefresh}
            />,
            <IconToggle
              color="white"
              underlayColor={COLOR.grey400}
              key="search"
              name="search"
              onPress={() => navigate('PlacesSearch', {
                userPosition: state.params && state.params.userPosition,
                onPlaceSelect:  state.params && state.params.onPlaceSelect })
              }
            />
            ],
          menu: {
            labels: this.menuOptions
          }
        }}
        onRightElementPress={this.handleMenuSelect}
      />
    );
  }
}

MapHeader.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({})
    }),
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setParams: PropTypes.func
  }).isRequired
};


export default MapHeader;