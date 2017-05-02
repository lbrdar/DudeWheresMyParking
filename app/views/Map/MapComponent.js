import React from 'react'
import {
  Text,
  View,
  Button
} from 'react-native'
import MapView from 'react-native-maps';
import styles from './MapStyle';


class MapScreen extends React.Component {
  static navigationOptions = { title: 'Map', };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props);

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

    );
  }
}

export default MapScreen;