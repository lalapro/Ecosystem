import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button } from 'react-native';
import axios from 'axios';

class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      newLocation: '',
      location: 'Attach a Location',
      created: '',
    }

    this.changeLocation = this.changeLocation.bind(this);
  }
  //axios.get for existing markers
  componentWillMount() {
    //give axios user id and get Location names
    axios.get('http://10.16.1.152:3000/markers', {params: {userID: 2}})
      .then((response) => {
        let markers = response.data;
        console.log(markers)
        markers = markers.map((row) => {
          return row.Marker_Title;
        })
        markers.unshift('none')
        this.setState({markers})
      })
      .catch((err) => {console.error('locationpickers', err)})
  }

  changeLocation(location) {
    this.setState({location});
    this.props.onSelect(location);
  }

  render() {
    return(
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          selectedValue={this.state.location}
          onValueChange={this.changeLocation}
        >
          {this.state.markers ?
            this.state.markers.map((location, i) => {
              return (
                <Picker.Item key={i} label={location} value={location} />
              )
            }) : ''
          }
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 30,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#8A7D80',
    borderColor: '#8A7D80',
    borderWidth: 1
  },
  picker: {
    width: 200,
  },
  pickerItem: {
    color: '#8A7D80'
  },
  onePicker: {
    width: 200,
    height: 88,
  },
  onePickerItem: {
    height: 88,
    color: '#8A7D80'
  },
});

export default LocationPicker;
