import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Dialog,
  Divider,
  COLOR
} from 'react-native-material-ui';
import { RadioButton, Button } from '../../common';
import styles from './MapStyle';


class MapTypeModal extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selectedType
    };
  }

  handleModalActions = (actionName) => {
    if (actionName === 'OK') {
      this.props.changeType(this.state.selected);
    }
    this.props.navigation.setParams({ openTypeModal: false });
  };

  render() {
    const { selected } = this.state;
    return (
      <Dialog style={{ border: `1 solid ${COLOR.grey400}` }}>
        <Dialog.Title><Text>Choose map type</Text></Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogContent}>
            <RadioButton
              label="Standard"
              checked={selected === 'standard'}
              value="standard"
              onPress={selected => this.setState({ selected })}
            />
            <Divider />
            <RadioButton
              label="Satellite"
              checked={selected === 'satellite'}
              value="satellite"
              onPress={selected => this.setState({ selected })}
            />
            <Divider />
            <RadioButton
              label="Hybrid"
              checked={selected === 'hybrid'}
              value="hybrid"
              onPress={selected => this.setState({ selected })}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.dialogActionsContainer}>
            <View style={{ marginLeft: 8 }}>
              <Button
                primary={false}
                label='Back'
                onPress={this.handleModalActions}
              />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Button
                primary={false}
                accent
                label='OK'
                onPress={this.handleModalActions}
              />
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

MapTypeModal.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
    state: PropTypes.shape({}),
    goBack: PropTypes.func
  }).isRequired,
  changeType: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired
};


export default MapTypeModal;