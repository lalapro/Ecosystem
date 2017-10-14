import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { Components, MapView, Permissions, Constants } from 'expo';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import Location from './AddLocation.js';
import GetCurrentLocation from './GetCurrentLocation';

const { width, height } = Dimensions.get("window");

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  state = {
    markers: [],
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    currentLocation: {},
    render: false,
    iconLoaded: false
  };


  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      console.log('map rendering...should get markers')
      axios.get('http://10.16.1.152:3000/mapMarkers', {params: {user: 777}})
        .then(markers => this.setState({
          markers: markers.data
        }))
        .then(res => {
          console.log(this.state.markers)
          GetCurrentLocation().then(location => {
            this.setState({
              region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
              }
            }, () => this.updateCurrentLocation())
          })
          .then(res => this.setState({render: true}))
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }

  updateCurrentLocation() {
    GetCurrentLocation().then(location => {
      this.setState({
        currentLocation: {
          coordinate: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          title: "Current Location",
          description: "Me"
        }
      })
    })
    .then(res => {
      this.map.animateToRegion(
        {
          ...this.state.currentLocation.coordinate,
          latitudeDelta: 0.00984,
          longitudeDelta: 0.00834,
        }
      )
    })
  }



  zoom(marker) {
    this.map.animateToRegion(
      {
        ...marker.coordinate,
        latitudeDelta: 0.00984,
        longitudeDelta: 0.00834,
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return this.state.render ? (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          // onLayout={() => { this.mark.showCallout() }}
        >
          <MapView.Marker
            key={this.state.iconLoaded ? 'markerLoaded' : 'marker'}
            coordinate={this.state.currentLocation.coordinate}
            title={this.state.currentLocation.title}
            description={this.state.currentLocation.description}
            >
            <Image style={{width: 20, height: 20}} source={require('../assets/egg6.png')} onLoadEnd={() => {if (!this.state.iconLoaded) this.setState({iconLoaded: true});}}/>
          </MapView.Marker>
          {this.state.markers.map((marker, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
                title={marker.Title}
                description={marker.Description}
                identifier={marker.Title}
                >
                <Image source={images[marker.Avatar][1]} style={styles.marker} />
              </MapView.Marker>
            );
          })}


        </MapView>
        <Animated.ScrollView
          vertical
          scrollEventThrottle={1}
          snapToInterval={CARD_WIDTH}
          style={styles.scrollView}
        >
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity key={index} onPress={() => this.zoom(marker)} style={styles.cardContainer}>
              <Text style={styles.cardtitle}>
                {marker.Title}
              </Text>
              <Image source={images[marker.Avatar][1]} style={styles.cardImage}/>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => navigate('Avatar')} style={styles.cardContainer}>
            <Image source={require("../assets/plus.png")} style={styles.cardImage}/>
          </TouchableOpacity>
        </Animated.ScrollView>
        <TouchableOpacity style={styles.recenter} onPress={() => this.updateCurrentLocation()}>
          <Image source={require("../assets/egg6.png")} style={{width: 50, height: 50}} />
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <Image source={require("../assets/loading.gif")} style={{width: 200, height: 200}}/>
      </View>
    )
  }
}


const images = [
  [0, require("../assets/egg.png")],
  [1, require("../assets/egg2.png")],
  [2, require("../assets/egg4.png")],
  [3, require("../assets/egg5.png")]
]




const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    position: "absolute",
    top: 30,
    bottom: 30,
    left: width - 60,
    width: 100,
    height: height / 2
  },
  cardContainer: {
    height: 60,
    width: 90,
  },
  cardImage: {
    width: 30,
    height: 30
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  marker: {
    maxWidth: 60,
    maxHeight: 60
  },
  recenter: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    right: 50
  },
  ecoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecoBuds: {
    width: 100,
    height: 100
  }
});
