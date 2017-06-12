import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import DrawerContent from './DrawerContentComponent';
import * as Actions from '../../common/actions/drawer';
import styles from './DrawerStyles';


function mapStateToProps(state) {
  return {
    drawer: state.drawer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class DrawerComponent extends Component {
  getStylesWhenOpen = (ratio) => ({
    main: {
      opacity: (2 - ratio) / 2
    },
    mainOverlay: {
      ...styles.openOverlay,
      opacity: ratio ? 0.8 : 0
    }
  });

  render() {
    return (
      <Drawer
        type="overlay"
        open={this.props.drawer.open}
        content={<DrawerContent />}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={styles}
        tweenHandler={this.getStylesWhenOpen}
        onCloseStart={this.props.closeDrawer}
      >
        {this.props.children}
      </Drawer>
    );
  }
}

DrawerComponent.propTypes = {
  children: PropTypes.element.isRequired,
  drawer: PropTypes.shape({
    open: PropTypes.bool
  }).isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);