import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

// import FirstScreen from './FirstScreen';
// import SecondScreen from './SecondScreen';
import Map from '../Map/MapStack';
import Profile from './Profile';
import Login from '../Login/Login.js'
import Home from '../Home/Home';
import EcoSystem from './EcoSystem';
import TaskBuilder from '../Tasks/TaskBuilder';

class Logout extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.screenProps.logOutUser)
	}
	static navigationOptions = {
    drawerLabel: 'Logout'
  };

  render() {
    return (
      <Button
				onPress={this.props.screenProps.logOutUser}
				title="LogOuttttt"
			/>
    );
  }
}

const NavigationBar = DrawerNavigator(
	{
		// ' ': {
		// 	path: '/',
		// 	screen: Main,
		// 	// navigationOptions: {
		// 	// 	drawerIcon: ({tintColor}) => {
		// 	// 		<Image source={require('./Images/toast.png')} style={{width: 70, height: 70, marginLeft: 40}}
		// 	// 		/>
		// 	// 	}
		// 	// }
		// },
		Home: {
			path: '/',
			screen: EcoSystem
		},
		Profile: {
			screen: Profile
		},
		Map: {
			screen: Map
		},
		Logout: {
			screen: Login
		},
		TaskBuilder: {
			screen: TaskBuilder
		}
	},
	{
		initialRouteName: 'Profile',
		initialRouteName: 'Home',
		drawerPosition: 'left',
		drawerWidth: 100,
		alignItems: 'center',
		contentOptions: {
			activeTintColor: 'rgba(0, 0, 0, 0.3)'
		}
	}

)

export default NavigationBar;
