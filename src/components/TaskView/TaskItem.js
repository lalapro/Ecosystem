import React, { Component } from 'react';
<<<<<<< HEAD
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
=======
import { Modal, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
>>>>>>> rebasing

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
        <Text>{this.props.task.Task_Title}</Text>
        {!this.state.expanded ? (
          <View style={styles.subtitleView}>
            <Text style={styles.collapsed}>{task.Task_Description}</Text>
            <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 50}}>&#x21E9;</Text>
          </View>
        ) : (
          <View style={styles.subtitleView}>
            <Text style={styles.expanded}>
              {task.Task_Description} {"\n"}
              {task.Completion} {"\n"}
              {task.Start} {"\n"}
              {task.End} {"\n"}
              {task.Frequency}
            </Text>
            <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 50}}>&#x21E7;</Text>
          </View>
        )
        }
      <TouchableHighlight onPress={this.editTask}><Text style={{fontSize: 50}}>&#x2699;</Text></TouchableHighlight>
      </View>
    )
  }
}


export default TaskItem;

styles = StyleSheet.create({
  subtitleView: {
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
