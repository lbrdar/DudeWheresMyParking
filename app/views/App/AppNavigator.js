import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import routes from '../../routes';


export const AppNavigator = StackNavigator(routes);


const mapStateToProps = state => ({
  navigation: state.navigationReducers,
});

const AppWithNavigationState = ({ dispatch, navigation }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(AppWithNavigationState);