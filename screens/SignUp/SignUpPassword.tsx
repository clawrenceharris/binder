import { View, Text, SafeAreaView, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native'
import { assets, Colors } from '../../constants'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import CustomInput from '../../components/CustomInput'
import { auth, db, signIn, signUp } from '../../Firebase/firebase'
import useColorScheme from '../../hooks/useColorScheme'
import ModalComponent from '../../components/Modal'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import Achievements from '../../constants/data/Achievements'
import StyledTextInput from '../../components/StyledTextInput'
const SignUpPassword = (props) => {

    const [error, setError] = useState('')
    const colorScheme = useColorScheme()
    const [password, setPassword] = useState('')



    const onNextPressed = () => {
        props.navigation.navigate('SignUpSchool', { ...props.route.params, password })

    }





    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>
                <Header navigation={props.navigation} />


                <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>

                    <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"Enter a password"}</Text>
                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{descriptions.password}</Text>

                    <StyledTextInput
                        error={error}
                        isClearable
                        placeholder='Password'
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}


                    />


                    <Text>{error}</Text>

                    <Button
                        onPress={onNextPressed}
                        title={'Next'}
                        style={{ width: '50%', marginTop: 20 }}
                        disabled={password.length < 6}

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



export default SignUpPassword