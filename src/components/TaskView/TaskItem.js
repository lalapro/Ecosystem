import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Font, AppLoading} from 'expo';

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.editTask = this.editTask.bind(this);
  }

  editTask() {
    //send props to fill out a taskbuilder page
  }
  //title, description, completion, start, end, frequency, days, category id -color code?, markerid
  render() {
    const {task} = this.props
    return (
      <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {!this.state.expanded ? (
          <View>
            <Text style={{fontSize: 30, alignItems: 'left', justifyContent: 'left'}}>{this.props.task.Task_Title}</Text>
            <View style={styles.subtitleView} >
              <Text style={styles.collapsed}>{task.Task_Description}</Text>
              <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 30}}>&#x21E9;</Text>
              <TouchableHighlight onPress={this.editTask}><Text style={{fontSize: 30}}>&#x2699;</Text></TouchableHighlight>
            </View>
          </View>
        ) : (
          <View>
            <Text style={{fontSize: 30}}>{this.props.task.Task_Title}</Text>
            <View style={styles.subtitleView}>
              <Text style={styles.expanded} style={styles.subtitleView}>
                {task.Task_Description} {"\n"}
                {task.Completion} {"\n"}
                {task.Start} {"\n"}
                {task.End} {"\n"}
                {task.Frequency}
              </Text>
              <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 30}}>&#x21E7;</Text>
              <TouchableHighlight onPress={this.editTask}><Text style={{fontSize: 30}}>&#x2699;</Text></TouchableHighlight>
            </View>
          </View>
        )
        }
      
      </View>
    )
  }
}


export default TaskItem;

styles = StyleSheet.create({
  subtitleView: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  expanded: {
    // fontFamily: 'HelevticaNeue'
  },
  collapsed: {
    // fontFamily: 'HelevticaNeue'
  }
})
