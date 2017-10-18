import React, { Component } from 'react';
import { CheckBox, FlatList, Modal, Text, TouchableHighlight, View, Button, ScrollView, StyleSheet } from 'react-native';
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
      <View style={{marginTop: 22, marginHorizontal: 22}}>
        <View style={{margin: 20, alignItems: 'flex-start', alignSelf: 'left'}}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            title="&#9776;"
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{marginTop: 22, backgroundColor: 'rgba(255,255,255,0.5'}}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
         <View >
         <ScrollView 
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll'); }}
            scrollEventThrottle={200}
            style={styles.scrollView}
          >
            <List>
              <TouchableHighlight onPress={() => {this.hideModal()}}><Text style={{fontSize: 30, textAlign: 'right', marginTop: 5}}>&#x2612;</Text></TouchableHighlight>
              {this.state.tasks.map((task, i) => {
                return (
                  <TaskItem key={i} userID={this.props.userID} task={task}/>
                )
              })}
            </List>
          </ScrollView>
         </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
    height: 300
  }
})
export default TaskModal;
