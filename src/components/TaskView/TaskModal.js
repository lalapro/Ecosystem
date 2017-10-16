// import React, { Component } from 'react';
// import { Modal, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
// import { List } from 'react-native-elements';
// import TaskItem from './TaskItem.js';
//
// class TaskModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: [],
//       modalVisible: false
//     };
//   }
//
//   // componentWillReceiveProps() {
//   //   //receives an array of tasks
//   //   console.log(this.props.allTasks)
//   //   let allTasks = this.props.allTasks;
//   //   //receives a location id
//   //   let marker_Id = this.props.marker_Id;
//   //   //filter array by location id
//   //   let filteredTasks = allTasks.filter((task) => {
//   //     return task.marker_Id === marker_Id;
//   //   })
//   //     //save array of filterd tasks to state
//   //   this.setState({filteredTasks})
//   // }
//
//   componentDidMount() {
//     this.setState({
//       tasks: this.props.tasks
//     }, () => console.log(this.state))
//   }
//
//   render() {
//     return(
//       <View style={{marginTop:20}}>
//         <TouchableHighlight onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
//           <Text>X</Text>
//         </TouchableHighlight>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={this.state.modalVisible}>
//           {/* <List>
//             {this.state.tasks.map((task, i) => {
//               return (<TaskItem key={i} task={task} />)
//             })}
//           </List> */}
//           <Text>
//             Show me please!
//           </Text>
//         </Modal>
//       </View>
//     )
//   }
// }
//
// export default TaskModal;

import React, { Component } from 'react';
import { CheckBox, FlatList, Modal, Text, TouchableHighlight, View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TaskItem from './TaskItem.js';

class TaskModal extends Component {

  state = {
    modalVisible: false,
    tasks: [],
    fontsAreLoaded: false
  }

  async componentWillMount() {
    await Font.loadAsync(FontAwesome.font);
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks,
      fontsAreLoaded: true
    }, () => console.log('ITS MEEEE', this.state.tasks))
  }

  componentWillReceiveProps() {
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks
    }, () => console.log('ITS MEEEE', this.state.tasks))
  }

  render() {
    const { fontsAreLoaded } = this.state;
    return !fontsAreLoaded ? <AppLoading/> : (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
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
            <Button title="Hide Modal" onPress={() => {this.setState({modalVisible: false})}}/>
          </View>
         </View>
        </Modal>

      </View>
    );
  }
}

export default TaskModal;
