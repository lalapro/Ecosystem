import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Signup from "./Login/Signup";
import Login from "./Login/Login";

export const SignedOut = StackNavigator({
  LogIn: {
    screen: Login,
    navigationOptions: {
      title: "Log In"
    }
  },
  SignUp: {
    screen: Signup,
    navigationOptions: {
      title: "Sign Up"
    }
  }
});

import Map from './Map/MapStack.js';
import Profile from './Frontend/Profile';
import Home from './Home/Home';
import EcoSystem from './Frontend/EcoSystem';
import TaskBuilder from './Tasks/TaskBuilder';
import Logout from './Login/Logout.js';
import TaskItem from './TaskView/TaskItem.js';

export const SignedIn = DrawerNavigator(
	{
		Home: {
			screen: EcoSystem
		},
		Profile: {
			screen: Profile
		},
		Map: {
			screen: Map
		},
		TaskBuilder: {
			screen: props => <TaskBuilder {...props}/>
		},
		Logout: {
			screen: Logout
		}
	},
	{
		initialRouteName: 'Home',
		drawerPosition: 'left',
		drawerWidth: 100,
		alignItems: 'center',
		contentOptions: {
			activeTintColor: 'rgba(0, 0, 0, 0.3)'
		},
	}
)

export const createRootNavigator = (signedIn = true) => {
	return StackNavigator(
		{
			SignedIn: {
				screen: SignedIn,
				navigationOptions: {
					gesturesEnabled: false
				}
			},
			SignedOut: {
				screen: SignedOut,
				navigation: {
					gesturesEnabled: false
				}
			}
		},
		{
			headerMode: "none",
			initialRouteName: signedIn ? "SignedIn" : "SignedOut"
		}
	)
}
