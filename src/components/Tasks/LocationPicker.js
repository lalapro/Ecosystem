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
      MarkerID: ''
    }

    this.changeLocation = this.changeLocation.bind(this);
  }
  //axios.get for existing markers
  componenDidMount() {
    //give axios user id and get Location names
    axios.get('http://10.16.1.218:3000/markers', {params: {userID: this.props.userID}})
      .then((response) => {
        let markers = response.data;
        this.setState({markers})
      })
      .catch((err) => {console.error('locationpickers', err)})
  }

  componentDidMount() {
    setTimeout(() => {
      if(this.props) {
        this.setState({location: this.props.marker, userID: this.props.userID})
      }
    }, 800)
  }

  changeLocation(location) {
    this.setState({location});
    this.props.onSelect(location);
  }

  componentWillReceiveProps(oldone, newone){
    setTimeout(() => {this.setState({ MarkerID: oldone.task.Marker_ID}); 
      this.state.markers.map(ele => {
        if (this.state.MarkerID === ele.Marker_ID) {
           this.setState({ location: ele.Marker_Title })
          }
        });
      }); 
  }

  render() {
    return(
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          selectedValue={this.props.placeholder}
          onValueChange={this.changeLocation}
        >
        {this.state.location ?           
          <Picker.Item label={this.state.location} value={this.state.MarkerID}/> : null}
          {this.state.markers ?
            this.state.markers.map((location, i) => {
              return (
                <Picker.Item key={i} label={location.Marker_Title} value={location.Marker_ID} />
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
