import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button, TouchableHighlight, Text } from 'react-native';
import TaskDatePicker from './DatePicker.js';
import LocationPicker from './LocationPicker.js';
import CategoryPicker from './CategoryPicker.js';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 'Does not repeat.'
    }
    this.changeFrequency = this.changeFrequency.bind(this);
  }

  changeFrequency(itemValue) {
    this.setState({frequency: itemValue})
    this.props.handleFrequencyChange(itemValue)
  }
  render() {
    return(
      <View style={styles.container}>
        <TextInput 
          onChangeText={(title) => this.props.handleTaskTitleChange(title)}
          placeholder="Name of Task"
          style={styles.input} 
        />
        <TextInput
          onChangeText={(description) => this.props.handleDescriptionChange(description)}
          placeholder="Description"
          style={styles.input} 
        />
        <TaskDatePicker placeholder="Start" onSelect={(startTime) => this.props.handleStartChange(startTime)} />
        <TaskDatePicker placeholder="End" onSelect={(endTime) => this.props.handleEndChange(endTime)} />
        <LocationPicker style={styles.picker} onSelect={(itemValue) => this.props.handleLocationChange(itemValue)}/>
        <CategoryPicker style={styles.picker} onSelect={(itemValue) => this.props.handleCategoryChange(itemValue)}/>
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          selectedValue={this.state.frequency}
          onValueChange={(itemValue) => this.changeFrequency(itemValue)}
        >
          <Picker.Item label="Does not repeat" value="no-repeat" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
          <Picker.Item label="Yearly" value="yearly" />
        </Picker>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableHighlight onPress={() => {this.props.saveTask()}}><Text style={{fontSize: 30, textAlign: 'right'}}>&#x2714;</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => {this.props.cancel()}}><Text style={{fontSize: 30, textAlign: 'right'}}>&#x274c;</Text></TouchableHighlight>
        </View>
      </View>
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
  }
});

export default TaskForm;
