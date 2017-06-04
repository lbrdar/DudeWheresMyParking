import React, { PropTypes } from 'react'
import {
  IconToggle,
  COLOR,
  Toolbar
} from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../common/actions';

function mapStateToProps(state) {
  return {
    drawer: state.drawerReducers
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class MapHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { navigate, navigation: { state } } = this.props;
    return (
      <Toolbar
        centerElement="Map"
        leftElement="menu"
        onLeftElementPress={() => this.props.toggleDrawer()}
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
              onPress={() => navigate('PlacesSearch', { onPlaceSelect:  state.params && state.params.onPlaceSelect })}
            />
            ]
        }}
      />
    );
  }
}

MapHeader.contextTypes = {
  drawer: PropTypes.shape({})
};

MapHeader.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({})
    }),
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setParams: PropTypes.func
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHeader);