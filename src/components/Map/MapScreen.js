import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { Components, MapView, Permissions, Constants, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import Location from './AddLocation.js';
import GetCurrentLocation from './GetCurrentLocation';
import TaskModal from '../TaskView/TaskModal.js';



const { width, height } = Dimensions.get("window");

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  state = {
    markers: [],
    markerIDs: [],
    userID: 2,
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    currentLocation: {},
    render: false,
    iconLoaded: false,
    modalVisible: false,
    currentPress: []
  };



  componentDidMount() {;
     axios.get('http://10.16.1.152:3000/mapMarkers', {params: {userID: this.state.userID}})
      .then(markers => {
        console.log('markers got')
        this.setState({markers: markers.data})
      })
      .then(res => {
        this.setState({markerIDs: []});
        let allMarkers = this.state.markers
        for(let i = 0; i < allMarkers.length; i++) {
          this.state.markerIDs.push(allMarkers[i].Marker_Title)
        }
      })
      .then(res => this.updateCurrentLocation())
      .then(res => setTimeout(this.startRender, 350))
      .then(res => setTimeout(() => {this.animateMap()}, 1550))
      .catch(err => console.error(err))

  }

  startRender = () => {
    console.log('hi')
    this.setState({
      render: true
    })
  }

  animateMap() {
    this.map.fitToSuppliedMarkers(this.state.markerIDs, true)
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
      if (this.state.render) {
        console.log('should center to me')
        this.map.animateToRegion(
          {
            ...this.state.currentLocation.coordinate,
            latitudeDelta: 0.0084,
            longitudeDelta: 0.0034,
          }
        )
      }
    })
  }

  toggleModal(marker) {
    if(marker.tasks) {
      this.setState({
        modalVisible: true,
        currentPress: marker.tasks
      }, () => console.log(this.state.modalVisible))
    }
  }

  toggleHide() {
    this.setState({
      modalVisible: false
    })
  }

  zoom(marker) {
    console.log(marker);
    this.map.animateToRegion(
      {
        latitude: marker.Latitude,
        longitude: marker.Longitude,
        latitudeDelta: 0.000984,
        longitudeDelta: 0.000834,
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
        >
          {this.state.render ? (
            <MapView.Marker
              key={this.state.iconLoaded ? 'markerLoaded' : 'marker'}
              coordinate={this.state.currentLocation.coordinate}
              title={this.state.currentLocation.title}
              description={this.state.currentLocation.description}
              >
                <Image style={{width: 20, height: 20}} source={require('../assets/egg6.png')} onLoadEnd={() => {if (!this.state.iconLoaded) this.setState({iconLoaded: true});}}/>
              </MapView.Marker>
          ) : null }
          {this.state.markers.map((marker, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
                title={marker.Marker_Title}
                description={marker.Marker_Description}
                identifier={marker.Marker_Title}
                onPress={() => this.toggleModal(marker)}
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
                {marker.Marker_Title}
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
        {this.state.modalVisible ? (
          <TaskModal userID={this.state.userID} tasks={this.state.currentPress} modalVisible={this.state.modalVisible} toggleHide={this.toggleHide.bind(this)}/>
        ) : null }
      </View>
    ) :  (
        <View>
          <Image source={require("../assets/loading.gif")} style={{width: 200, height: 200}}/>
        </View>
    )
  }
}


const images = [
  [0, require("../assets/home2.png")],
  [1, require("../assets/work2.png")],
  [2, require("../assets/gym.png")],
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
    bottom: 60,
    right: 30
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
