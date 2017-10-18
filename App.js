import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { SignedOut, SignedIn, createRootNavigator } from "./src/components/router.js"
import { getUserInfo, isSignedIn } from './src/components/auth.js'
import Login from './src/components/Login/Login.js';
import Signup from './src/components/Login/Signup.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      user: {}
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo = (user) => {
    this.setState({
      user: user
    })
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true}))
      .catch(err => console.error(err));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout screenProps={ this.getUserInfo }/>
  }
}
