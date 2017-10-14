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

import Map from './Map/Map.js';
import Profile from './Frontend/Profile';
import Home from './Home/Home';
import EcoSystem from './Frontend/EcoSystem';
import TaskBuilder from './Tasks/TaskBuilder';

export const SignedIn = DrawerNavigator(
	{
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

export const createRootNavigator = (signedIn = false) => {
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
		}
	)
}
