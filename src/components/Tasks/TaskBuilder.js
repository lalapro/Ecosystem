import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity, Button, Picker } from 'react-native';
import TaskForm from './TaskForm.js';
import axios from 'axios';

class TaskBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: '',
      category: '',
      frequency: '',
      saved: null
    }
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  handleTaskTitleChange(title) {
    this.setState({title})
  }

  handleDescriptionChange(description) {
    this.setState({description})
  }

  handleStartChange(startTime) {
    this.setState({startTime})
  }

  handleEndChange(endTime) {
    this.setState({endTime})
  }

  handleLocationChange(location) {
    this.setState({location})
  }

  handleCategoryChange(category) {
    this.setState({category})
  }

  handleFrequencyChange(frequency) {
    this.setState({frequency})
  }

  handleCheck(day) {

  }

  saveTask() {
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startTime;
    let endTime = this.state.endTime;
    let location = this.state.location;
    let category = this.state.category;
    let frequency = this.state.frequency;
    //need to send username to get userId
    axios.post('http://10.16.1.152:3000/newTask', {title, description, startTime, endTime, location, category, frequency})
      .then((response) => this.setState({
        saved: 'Task Saved',
        title: '',
        description: '',
        startTime: null,
        endTime: null,
        location: 'none',
        category: 'none',
        frequency: ''
      }))
      .catch((err) => console.error(err))
  }

  render() {
    return(
      <View style={styles.container}>
        <TaskForm style={styles.formContainer}
          handleTaskTitleChange={this.handleTaskTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          handleStartChange={this.handleStartChange}
          handleEndChange={this.handleEndChange}
          handleLocationChange={this.handleLocationChange}
          handleCategoryChange={this.handleCategoryChange}
          handleFrequencyChange={this.handleFrequencyChange}
          saveTask={this.saveTask}
        />
        {this.state.saved ? 
          <Text>Task Saved!</Text> : <Text>Don't forget to save.</Text>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    bottom: 50,

  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TaskBuilder;
