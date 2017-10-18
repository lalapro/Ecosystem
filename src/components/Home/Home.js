import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navbar from '../Frontend/Navbar.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <View style={{margin: 20, alignItems: 'left'}}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            title="&#9776;"
          />
        </View>
        <Navbar
          screenProps={this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})

