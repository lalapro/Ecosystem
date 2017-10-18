import React, { Component } from 'react';
import { StyleSheet, View, Text, Separator, Dimensions, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import Swipeout from 'react-native-swipeout';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Navbar from '../Frontend/Navbar.js';
import Objects from './Objects';
import Tasks from './Tasks';
import profile from './Profile';
import axios from 'axios';


export default class EcoSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userID: 2,
      locations: [],
      render: false,
      index: 0,
      currentTask: '',
      currentDescription: ''
      // currentLocation: 'Home',
      // currentTasks: ['a', 'b'],
      // currentData: [],
      // completionPoints: 0
    }
    // this.viewChange = this.viewChange.bind(this);
  }

  getMarkers() {
    axios.get('http://10.16.1.218:3000/mapMarkers', {params: {userID: this.state.userID}})
    .then(res => this.setState({
      locations: res.data,
      currentDescription: '',
      currentTask: ''
    }))
    .then(res => this.setState({
      render: true
    }))
    .catch(err => console.error(err))
  }
  componentDidMount() {
    this.getMarkers();
  }
  //
  showTask(task) {
    this.setState({
      currentTask: task.Task_Title,
      currentDescription: task.Task_Description
    })
  }

  editTask() {
    //send back to task builder with auto populated fields

  }

  deleteTask() {
    axios.delete('http://10.16.1.218:3000/deleteTask', {params: {userID: this.state.userID, taskTitle: this.state.currentTask}})
    .then(res => this.getMarkers())
    .catch(err => console.error(err))
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { navigate } = this.props.navigation;
    const swipeBtns = [
      {
        text: 'Edit',
        backgroundColor: '#f4a316',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.editTask() }
     },
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.deleteTask() }
     }
    ];
    console.log(this.state.render, this.state.locations)
    return this.state.render ? (
      <View style={styles.wrapper}>
        <View style={{flex: 7}}>
          <Swiper
            horizontal={true}
            onIndexChanged={(index) => this.setState({index: index, currentTask: '', currentDescription: ''})}
            loop={false}
            >
              {this.state.locations.map((location, index) => (
                <View key={index} style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.cardtitle}>
                    {location.Marker_Title}
                  </Text>
                  <Text style={styles.cardDescription}>
                    {location.Marker_Description}
                  </Text>
                  <Image
                    source={images[location.Avatar][1]}
                    style={{width: 200, height: 200}}
                  />
                </View>
              ))}
            </Swiper>
            <View style={styles.separator} />
            <Swipeout right={swipeBtns}
              autoClose='true'
              backgroundColor= 'transparent'
            >
              <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>
                  {this.state.currentTask} {"\n"}
                </Text>
                <Text stlye={{fontSize: 14}}>
                  {this.state.currentDescription}
                </Text>
              </View>
            </Swipeout>
          <View style={styles.separator} />
        </View>
        <View style={{flex: 3}}>
          <ScrollView horizontal={true}>
            {this.state.locations[this.state.index].tasks ? (
              this.state.locations[this.state.index].tasks.map((task, index) => (
                <TouchableHighlight style={styles.circle} key={index} onPress={() => this.showTask(task)}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {task.Task_Title}
                  </Text>
                </TouchableHighlight>
              ))
            ) : null}
            <TouchableOpacity onPress={() => { navigate('TaskBuilder')}}>
              <Image source={require('../assets/plus.png')} style={{height: 150, width: 150}} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    ) : null
  }
}

{/* <Swiper
  horizontal={true}
  onIndexChanged={(index) => {this.viewChange(index)}}
>
<View style={{height: height, width: width, position: 'absolute'}}>
  <Image style={{height: height, width: width, position: 'absolute'}}
    source={require('../assets/home.png')}>
    <Objects data={this.state.locations[0]}/>
  </Image>
</View>

<View style={{height: height, width: width, position: 'absolute'}}>
  <Image style={{height: height, width: width, position: 'absolute'}}
    source={require('../assets/work.png')}>
    <Objects data={this.state.locations[1]}/>
  </Image>
</View>

</Swiper> */}

const images = [
  [0, require("../assets/home2.png")],
  [1, require("../assets/work2.png")],
  [2, require("../assets/gym.png")],
  [3, require("../assets/egg5.png")]
]

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  wrapper: {
    display: 'flex',
    flex: 1
  },
  cardtitle: {
    fontSize: 50,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 50,
    color: "#444",
  },
  circle: {
   width: 120,
   height: 120,
   borderRadius: 120,
   borderColor: 'red',
   borderWidth: 0.5,
   margin: 5,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
  //  backgroundColor: 'red'
 },
 separator: {
  height: 1,
  width: 400,
  backgroundColor: '#8A7D80',
  marginLeft: 15,
  
}
})
