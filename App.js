import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapComponent from './mapComponent';

class App extends Component {

  state = {
    region: {
      latitude: 21.1458,
      longitude: 79.0882,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 21.1458,
  //       longitude: 79.0882,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //   };
  // }

  render() {
    return (
      <View style={styles.MainContainer}>

        <Text> helllo map</Text>
        <View style={styles.mapStyle}>
          <MapComponent />
        </View>


      </View>
    );
  }
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#e4e4e4',
  },
  mapStyle: { 
    width: '100%', 
    height: 350, 
    alignItems: 'center', 
    justifyContent: 'center',
    

  }
});

export default App;
