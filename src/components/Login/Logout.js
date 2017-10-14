import React, { Component } from 'react';
import { Text, Image, Button, AsyncStorage } from 'react-native';

export default class Logout extends React.Component {
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
