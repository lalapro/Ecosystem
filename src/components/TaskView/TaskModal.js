import React, { Component } from 'react';
import { CheckBox, FlatList, Modal, Text, TouchableHighlight, View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TaskItem from './TaskItem.js';

class TaskModal extends Component {

  state = {
    modalVisible: false,
    tasks: []
  }

  componentWillMount() {
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks
    })
  }

  componentWillReceiveProps() {
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks
    })
  }

  hideModal() {
    this.setState({
      modalVisible: false
    }, () => this.props.toggleHide())
  }


  render() {
    const { fontsAreLoaded } = this.state;
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <List>
              {this.state.tasks.map((task, i) => {
                return (
                  <TaskItem key={i} task={task}/>
                )
              })}
            </List>
            <Button title="Hide Modal" onPress={() => {this.hideModal()}}/>
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

export default TaskModal;
