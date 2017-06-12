import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Dialog,
  COLOR
} from 'react-native-material-ui';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '../../common';
import styles from './MapStyles';
import * as Actions from '../../common/actions/data';

function mapStateToProps(state) {
  return {
    auth: state.authReducers,
    data: state.dataReducers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class MarkerCalloutModal extends React.Component {
  constructor() {
    super();
    this.state = {
      openTakenFor: false
    }
  }

  handleModalActions = (actionName) => {
    if (actionName === 'Take'){
      this.setState({ openTakenFor: true });
    } else {
      this.props.closeModal();
    }
  };
  takeParking = (index) => {
    const { takeParkingSpot, closeModal, parkingSpot, auth, data } = this.props;
    takeParkingSpot(parkingSpot.id, data.takenForSlots[index].id, auth.userId);
    closeModal();
  };

  generateOptions = () => {
    return this.props.data.takenForSlots.map(({ duration }, index) => {
      if (duration / 60 >= 60) {
        const isLast = index === this.props.data.takenForSlots.length;
        if (isLast) {
          return `${duration / 60 / 60} hours or more`;
        }
        return ` < ${duration / 60 / 60} hours`;
      } else {
        return ` < ${duration / 60} minutes`;
      }
    });
  };

  render() {
    const { type, cost, taken } = this.props.parkingSpot;

    if (this.state.openTakenFor) {
      return (
        <Dialog style={{ border: `1 solid ${COLOR.grey400}` }}>
          <Dialog.Title><Text>Take parking spot</Text></Dialog.Title>
          <Dialog.Content>
            <Text>How long do you plan to be parked on this spot:</Text>
            <ModalDropdown
              style={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              dropdownTextStyle={styles.dropdownOpenText}
              dropdownStyle={styles.dropdown}
              options={this.generateOptions()}
              onSelect={this.takeParking}
            />
          </Dialog.Content>
        </Dialog>
      );
    }

    return (
      <Dialog style={{ border: `1 solid ${COLOR.grey400}` }}>
        <Dialog.Title><Text>Parking spot details</Text></Dialog.Title>
        <Dialog.Content>
          <View style={styles.row}>
            <Text style={styles.label}>Type: </Text><Text>{type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price per hour: </Text><Text>{cost}</Text>
          </View>
          {taken ? <Text style={styles.note}>*was marked as taken, but should be empty by now</Text> : null}
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.dialogActionsContainer}>
            <View style={{ marginLeft: 8 }}>
              <Button
                primary={false}
                label='Close'
                onPress={this.handleModalActions}
              />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Button
                primary={false}
                accent
                label='Take'
                onPress={this.handleModalActions}
              />
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

MarkerCalloutModal.propTypes = {
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    takenForSlots: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  parkingSpot: PropTypes.shape({
    type: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    taken: PropTypes.string
  }).isRequired,
  takeParkingSpot: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(MarkerCalloutModal);