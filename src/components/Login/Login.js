import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity, Button, AsyncStorage } from 'react-native';
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

  componentDidMount() {
    // console.log(this.props.screenProps)
  }

  handleUserInput(event) {
    this.setState({ username: event })
  }

  handlePasswordInput(event) {
    this.setState({ password: event})
  }

  handleRegularLogin() {
    axios.get(`http://10.16.1.152:3000/login`, {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(userData => {
      this.props.screenProps.handleLogIn(userData.data.user);
      AsyncStorage.setItem(`user_token`, userData.data.token);
    })
  }

  login = async () => {
    // console.log('login button hit', this.props.screenProps)
      const APP_ID = "1729141044061993"
      const options = {
          permissions: ['public_profile', 'email', 'user_friends'],
      }
      const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options)
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)

        // send post request to user table
        const user = await response.json()
        axios.post(`http://10.16.1.152:3000/token`, {
          name: user.name,
          username: user.id,
          token: token
        })
        .then(res => {
          this.props.screenProps.handleLogIn(res.data.user)
        })
        AsyncStorage.setItem(`user_token`, token);

    }
  }

  checkAsyncStorage = async () => {
    const tokenInPhone = await AsyncStorage.getItem(`user_token`)
    return tokenInPhone;
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
          onPress={() => {
            username = this.state.username
            password = this.state.password
            this.handleRegularLogin()
            }}
          style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>



        <Button
           onPress={this.login}
           title='Login with facebook' />




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
