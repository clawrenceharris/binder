import { ImageBackground, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Component } from 'react'
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import { styles } from '../SignUp';
import { assets, Colors } from '../../constants';
import Header from '../../components/Header';
import { rewordError } from '../../utils';
import { auth, db } from '../../Firebase/firebase';
import StyledTextInput from '../../components/StyledTextInput';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ' ',
            loading: false,
            emailFocused: false,
            passwordFocused: false

        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp = () => {
        this.setState({ loading: true })
        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                const user = userCredentials.user;

                console.log(user.uid)
                db.collection('users')
                    .doc(user.uid)
                    .set({
                        uid: user.uid,
                        displayName: '',
                        photoURL: null,
                        birthday: null,
                        gpa: '',
                        rank: 1,
                        cookies: 0,
                        gradYear: '',
                        school: null,
                        email: this.state.email,
                        lastActive: new Date(),
                        studyBuddies: [],
                        friends: [],
                        classes: [],
                        chatrooms: [],
                        isFirstLogin: true

                    })




            })

            .catch(e => {
                this.setState({ error: rewordError(e) })
                this.setState({ loading: false })

            })
    }


    render() {
        const { email, password, loading, error } = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: Colors.primary }}>
                    <Header navigation={this.props.navigation} color={Colors.white} />
                    <Text style={{ fontFamily: 'KanitLight', color: Colors.white, fontSize: 28, alignSelf: 'center' }}>{"Sign Up"}</Text>
                    <KeyboardAvoidingView
                        style={{ flex: 1, justifyContent: 'center', padding: 30 }}
                        behavior={Platform.OS == "ios" ? "padding" : "height"} >

                        <StyledTextInput
                            style={{ color: Colors.white, marginBottom: 20, borderWidth: this.state.emailFocused && 1, borderColor: '#00000080' }}
                            placeholder="Email"
                            secureTextEntry={false}
                            keyboardType='email-address'
                            value={email}
                            placeholderTextColor={'#ffffff60'}
                            autoFocus
                            onFocus={() => {
                                this.setState({
                                    emailFocused: true,
                                    passwordFocused: false
                                })
                            }}
                            onChangeText={(email) => this.setState({ email })}
                        />





                        <Text style={styles.errorMessage}>{error}</Text>



                        <Button
                            title={'Sign Up'}
                            style={{ width: '90%', marginTop: 20 }}
                            onPress={this.onSignUp}
                            disabled={!email || !password}
                            loading={loading}
                        />


                    </KeyboardAvoidingView>
                </View>

            </TouchableWithoutFeedback>
        )
    }
}

export default SignUp