import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { SignedOut, SignedIn } from "./src/components/router.js"
import { isSignedIn } from './src/components/auth.js'
import Login from './src/components/Login/Login.js';
import Signup from './src/components/Login/Signup.js';
import TaskBuilder from './src/components/Tasks/TaskBuilder.js';
import Home from './src/components/Home/Home.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }


  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true}))
      .catch(err => console.log(err));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    return <SignedIn />
  }
}
