import { ImageBackground, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Component, useState } from 'react'
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import { styles } from '../SignUp';
import { assets, Colors } from '../../constants';
import Header from '../../components/Header';
import { auth, db } from '../../Firebase/firebase';
import StyledTextInput from '../../components/StyledTextInput';
import useColorScheme from '../../hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { isValidEmail } from '../../utils';
import { EMAIL_ALREADY_IN_USE, INVALID_EMAIL } from '../../constants/ErrorMessages';
import { descriptions } from '.';

export const SignUpEmail = (props) => {
    const colorScheme = useColorScheme()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const onNextPress = () => {
        setError('')
        setLoading(true)
        if (isValidEmail(email)) {

            db.collection('users')
                .where('email', '==', email.trim().toLowerCase())
                .get()
                .then(query => {
                    if (query.docs.length > 0) {
                        console.log("ALREADY IN USE")
                        setTimeout(() => setError(EMAIL_ALREADY_IN_USE), 200)
                    }
                    else {
                        props.navigation.navigate('SignUpName', { email: email.toLowerCase().trim() })

                    }
                    setTimeout(() => setLoading(false), 200)
                })

        } else {


            setTimeout(() => setError(INVALID_EMAIL), 200)

            setTimeout(() => setLoading(false), 200)

        }
    }




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>
                <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

                <Header navigation={props.navigation} />

                <View style={{ paddingHorizontal: 30 }}>


                    <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"Enter your email"}</Text>
                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{descriptions.email}</Text>

                    <KeyboardAvoidingView
                        style={{ paddingHorizontal: 30 }}
                        behavior={Platform.OS == "ios" ? "padding" : "height"} >

                        <StyledTextInput
                            error={error}
                            isClearable
                            placeholder="Email"
                            secureTextEntry={false}
                            keyboardType='email-address'
                            value={email}
                            autoFocus
                            onChangeText={(value) => { setEmail(value); setError('') }}
                        />





                        <Text style={styles.errorMessage}>{error}</Text>



                        <Button
                            title={'Next'}
                            style={{ width: '50%', marginTop: 20 }}
                            onPress={onNextPress}
                            disabled={!email.trim()}
                            loading={loading}
                        />


                    </KeyboardAvoidingView>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', height: 90, alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', borderTopColor: Colors[colorScheme].gray, borderTopWidth: 1 }}>


                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray }]}>{"Already have an account?"}</Text>


                    <TouchableWithoutFeedback
                        onPress={() => {
                            props.navigation.popToTop()
                            props.navigation.navigate('Login')

                        }}
                    >
                        <View>

                            <Text style={[styles.description, { color: Colors.accent, marginLeft: 5 }]}>Sign In.</Text>
                        </View>

                    </TouchableWithoutFeedback>
                </View>


            </View>


        </TouchableWithoutFeedback>
    )

}

export default SignUpEmail