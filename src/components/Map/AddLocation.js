import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, TextInput } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StackNavigator, NavigationActions } from 'react-navigation';
import axios from 'axios';


export default class AddLocation extends React.Component {
  static navigationOptions = {
    title: 'Add a location!',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: 777,
      avatar: '',
      title: '',
      description: ''
    };
  }

  componentDidMount() {
    console.log('location', this.props.navigation.state.params)
    this.setState({
      // user: this.props.navigation.state.params.user_ID,
      avatar: this.props.navigation.state.params.avatar,
      title: this.props.navigation.state.params.title,
      description: this.props.navigation.state.params.description
    })
  }

  newLocation(coords) {
    let longitude = coords.lng;
    let latitude = coords.lat;
    axios.post('http://10.16.1.152:3000/newLocation', {
      user_ID: this.state.user,
      avatar: this.state.avatar,
      title: this.state.title,
      description: this.state.description,
      longitude: longitude,
      latitude: latitude
    })
    .then(res => console.log('posted'))
    .catch(err => console.err(err))
  }

  render() {
    const { params } = this.props.navigation.state;
    if (this.state.avatar !== '') {
      return (
        <View style={styles.container}>
          <Image source={images[this.state.avatar][1]} style={styles.ecobuds}/>
          <Text style={styles.cardtitle}>{this.state.title}</Text>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            currentLocation={true}
            query={{
              key: "AIzaSyBR1txfFIJaA2u4K37nDV3jlXPMuYVzFK4",
              language: 'en', // language of the results
              types: 'address' // default: 'geocode'
            }}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            //  console.log('on press', details.geometry.location);
            this.newLocation(details.geometry.location);
            this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Map'})
              ]
              }))
            }}
          />
        </View>
      )
    } else {
      return null;
    }
  }
}

const images = [
  [0, require("../assets/egg.png")],
  [1, require("../assets/egg2.png")],
  [2, require("../assets/egg4.png")],
  [3, require("../assets/egg5.png")]
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  ecobuds: {
    width: 100,
    height: 100
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  }
})
