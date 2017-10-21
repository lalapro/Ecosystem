import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, Alert } from 'react-native';
import { SignedOut, SignedIn, createRootNavigator } from "./src/components/router.js"
import { getUserInfo, isSignedIn } from './src/components/auth.js'
import Login from './src/components/Login/Login.js';
import Signup from './src/components/Login/Signup.js';
import Expo from 'expo';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentLocation: {}
    }
  }

  handleLogIn = (user) => {
    // console.log('handleLogin being called!')
    this.setState({
      user: user
    })
  }

  handleLogout = () => {
    // console.log('handleLogout being called!')
    this.setState({
      user: null
    })
  }

  componentDidMount() {
    this.checkAsyncStorage().then(token => {
      axios.get(`http://10.16.1.152:3000/token`, {
        params: {
          token: token
        }
      })
      .then(user => {
        // console.log(token, user.data[0])
        if(user.data[0]) {
          this.setState({
            user: user.data[0].ID
          })
        }
      })
      .catch(err => console.error(err))
    });
  }

  checkAsyncStorage = async () => {
    const tokenInPhone = await AsyncStorage.getItem(`user_token`)
    return tokenInPhone;
  }

  render() {
    // console.log('before render', this.state)
    if (this.state.user !== null) {
      // console.log('inside if statement', this.state)
      return <SignedIn screenProps={{
        userID: this.state.user,
        handleLogout: this.handleLogout
      }}/>
    } else {
      return <SignedOut screenProps={{
        handleLogIn: this.handleLogIn
      }}/>
    }
  }
}
