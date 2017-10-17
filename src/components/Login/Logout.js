import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage } from 'react-native';
import { onSignOut } from '../auth'

export default class Logout extends React.Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
    drawerLabel: 'Logout'
  };

  render() {
    return (
      <Button
				onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
				title="LogOuttttt"
			/>
    );
  }
}
