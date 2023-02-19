import { View, Text, Image, SafeAreaView, TextInput, TouchableWithoutFeedback, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import { SIZES } from '../../constants/Theme'
import { StatusBar } from 'expo-status-bar'
import StyledTextInput from '../../components/StyledTextInput'

const SignUpName = (props) => {
    const [displayName, setDisplayName] = useState('')
    const colorScheme = useColorScheme()
    const [error, setError] = useState('')
    const onNextPressed = () => {
        props.navigation.navigate('SignUpBirthday', { ...props.route.params, displayName: displayName.trim() })
    }





    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>
                <Header navigation={props.navigation} />


                <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>

                    <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"Add your name"}</Text>
                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{descriptions.name}</Text>

                    <StyledTextInput
                        error={error}
                        isClearable
                        placeholder='Full name'
                        value={displayName}
                        onChangeText={setDisplayName}
                        autoCapitalize={'words'}


                    />


                    <Text>{error}</Text>

                    <Button
                        onPress={onNextPressed}
                        title={'Next'}
                        style={{ width: '50%', marginTop: 20 }}
                        disabled={displayName.trim().length < 2}

                    />



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


export default SignUpName
