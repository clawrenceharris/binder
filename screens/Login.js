import { ImageBackground, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../Firebase/firebase';
import { getErrorMessage, isValidEmail } from '../utils';
import { styles } from './SignUp';
import CustomInput from '../components/CustomInput';
import Header from '../components/Header';
import Button from '../components/Button';
import { assets, Colors } from '../constants';
import Input from '../components/StyledTextInput';
import useColorScheme from '../hooks/useColorScheme';
import StyledTextInput from '../components/StyledTextInput';
import { INCORRECT_USERNAME, INVALID_USERNAME, USER_NOT_FOUND } from '../constants/ErrorMessages';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: '',
      password: '',
      error: '',
      loading: false,
      emailFocused: false,
      passwordFocused: false,


    }
    this.onLogIn = this.onLogIn.bind(this)
  }

  onLogIn = () => {
    this.setState({ loading: true })
    if (this.state.emailOrUsername.includes('@')) {
      console.log("email")
      auth
        .signInWithEmailAndPassword(this.state.emailOrUsername, this.state.password)
        .then(() => {
          this.setState({ loading: false })



        })

        .catch(e => {
          this.setState({ error: getErrorMessage(e.message) })
          this.setState({ loading: false })

        })
    }
    else {
      console.log("username")
      db.collection('users')
        .where('username', '==', this.state.emailOrUsername.toLowerCase())
        .get()
        .then(query => {
          if (query.docs.length === 1) {
            auth.signInWithEmailAndPassword(query.docs[0].data().email, this.state.password)
              .then(() => {
                this.setState({ loading: false })
              })
              .catch((e) => {
                this.setState({ error: getErrorMessage(e.message) })

                this.setState({ loading: false })
              })

          }
          else {
            this.setState({ error: INVALID_USERNAME })
            this.setState({ loading: false })

          }


        })
    }

  }


  render() {
    const {
      emailOrUsername,
      password,
      loading,
      error } = this.state;
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: this.props.colorScheme === 'light' ? Colors.white : Colors.dark.background }}>



          <Header navigation={this.props.navigation} />
          <Text style={{ fontFamily: 'KanitLight', color: Colors[this.props.colorScheme].tint, fontSize: 28, alignSelf: 'center' }}>{"Log In"}</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', padding: 30 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"} >













            <StyledTextInput
              isClearable
              style={{ marginBottom: 20 }}
              onFocus={() => {
                this.setState({
                  emailFocused: true,
                  passwordFocused: false
                })
              }}
              placeholder="Email or username"
              secureTextEntry={false}
              keyboardType='email-address'
              value={emailOrUsername}
              autoFocus
              onChangeText={(value) => this.setState({ emailOrUsername: value })}
            />



            <StyledTextInput
              isClearable
              style={{ marginBottom: 20 }}
              value={password}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              onSubmitEditing={() => {
                if (email && password)
                  this.onLogIn()
              }}
              onFocus={() => {
                this.setState({
                  emailFocused: false,
                  passwordFocused: true
                })
              }}
            />

            <Text style={styles.errorMessage}>{error}</Text>



            <Button
              title={'Log In'}
              style={{ width: '60%', marginTop: 20 }}
              onPress={this.onLogIn}
              disabled={!emailOrUsername || !password}
              loading={loading}
            />
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row', justifyContent: 'center', height: 90, alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', borderTopColor: Colors[this.props.colorScheme].gray, borderTopWidth: 1 }}>


            <Text style={[styles.description, { color: Colors[this.props.colorScheme].darkGray }]}>Don't have an account?</Text>


            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('SignUp')

              }}
            >
              <View>

                <Text style={[styles.description, { color: Colors.accent, marginLeft: 5, fontFamily: 'KanitMedium' }]}>Sign Up.</Text>
              </View>

            </TouchableWithoutFeedback>
          </View>
        </View>

      </TouchableWithoutFeedback>

    )
  }
}

export default Login