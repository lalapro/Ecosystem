import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LoginForm from './LoginForm';
import { onSignIn } from '../auth.js'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }


  handleUserInput(event) {
    this.setState({ username: event })
  }

  handlePasswordInput(event) {
    this.setState({ password: event})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/toastlogo.png")}
          />
          <Text>Build Habitats by keeping Good Habits</Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm

            handleUserInput={this.handleUserInput}
            handlePasswordInput={this.handlePasswordInput}
            />
        </View>

        <TouchableOpacity
          onPress={ onSignIn }
          style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
          style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 10
  }
});
