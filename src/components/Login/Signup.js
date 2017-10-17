import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import SignupForm from './SignupForm';
import { onSignIn } from '../auth.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }
  handleUserInput(event) {
    this.setState({ username: event })
  }
  handlePasswordInput(event) {
    this.setState({ password: event})
  }
  handleEmailInput(event) {
    this.setState({ email: event})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/toastlogo.png")}
          />
          <Text>Do you want to start building good Habits?</Text>
        </View>

        <View style={styles.formContainer}>
          <SignupForm
            handleSubmit={this.handleSubmit}
            handleUserInput={this.handleUserInput}
            handlePasswordInput={this.handlePasswordInput}
            handleEmailInput={this.handleEmailInput}
            />
        </View>

        <TouchableOpacity
          onPress={() => {
            onSignIn().then(() => this.props.navigation.navigate("SignedIn"))
          }}
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
    // flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    // alignItems: 'center',
    // justifyContent: 'center'
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
