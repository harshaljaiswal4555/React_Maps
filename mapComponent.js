import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';
// navigator.geolocation = require('@react-native-community/geolocation');
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0130
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapComponent extends Component {
  constructor() {
    super()
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markers: []
    }

  }

  getCurrentLoc = () => {
    Geolocation.getCurrentPosition((position) => {

      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({ initialPosition: initialRegion, markers: [ { latlng: initialRegion }] })
    },
      (error) => alert('Please Allow the location '),
      { enableHighAccuracy: true, timeout: 20000, });
  }

  componentDidMount() {
    this.getCurrentLoc();
  }

  renderScreen = () => {
    return (

      <View style={styles.container}>
        <MapView
          style={styles.map}
          annotations={this.state.markers}
          initialRegion={this.state.initialPosition}

          onPress={(e) => {
            this.setState({ markers: [{ latlng: e.nativeEvent.coordinate }] })
            console.log(e.nativeEvent.coordinate)
          }}
        >
          {
            this.state.markers.map((marker, i) => (
              <MapView.Marker key={i} coordinate={marker.latlng} />
            ))
          }
        </MapView>
        {this.renderBody()}
      </View>
      
    );
  }

  renderBody = () => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => this.getCurrentLoc()}>

          <Text style={{ color: 'blue' }}> Get Current Location</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (

      this.renderScreen()
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius:4,
    elevation:4,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom:20,

  },
});

export default MapComponent;