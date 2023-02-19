import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { db } from '../../Firebase/firebase'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import StyledTextInput from '../../components/StyledTextInput'
import Button from '../../components/Button'
import { styles } from '.'
import Header from '../../components/Header'


const SignUpUsername = (props) => {
    const [username, setUsername] = useState('')
    const [isUnique, setIsUnique] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const colorScheme = useColorScheme()

    const onNextPress = () => {
        if (!error) {
            props.navigation.navigate('SignUpPassword', { ...props.route.params, username: username.toLowerCase() })
        }
    }
    const checkUniqueUsername = (value) => {
        db.collection('users')
            .where('username', '==', value.toLowerCase())
            .get()
            .then(query => {
                if (query.docs.length > 0) {
                    setTimeout(() => setLoading(false), 200)
                    setError("The username " + value + " is not available")
                } else {
                    setTimeout(() => setLoading(false), 200)


                }

            })


    }
    const checkValid = (value) => {
        var letters = /^[A-Za-z_.]+$/;
        if (value.startsWith('.')) {
            setError("You can't start your username with a period.")
            return false
        }
        if (value.endsWith('.')) {
            setError("You can't end your username with a period.")
            return false
        }
        if (value.length < 3) {
            setError('Your username must be at least 3 characters long.')
            return false
        }

        if (!value.match(letters)?.length) {
            setError("Usernames can only use Roman letters (a-z, A-Z), numbers, underscores and periods")
            return false

        }

        setError('')
        return true



    }
    const onChangeUsername = (value) => {
        value = value.replace(' ', '_')
        setError('')
        let isValidUsername = false
        setUsername(value)
        if (value) {
            setLoading(true)
            isValidUsername = checkValid(value)
            checkUniqueUsername(value)



        }
        else {
            setError("Please choose a username")
        }





    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


            <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>

                <Header navigation={props.navigation} />
                <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
                    <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"Create a username"}</Text>
                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginVertical: 20 }]}>{"Pick a username for classmates to find you by. You can change this later."}</Text>

                    <StyledTextInput
                        placeholder='Username'
                        style={{ marginVertical: 10 }}
                        onChangeText={onChangeUsername}
                        value={username}
                        error={error}
                        autoCapitalize={'none'}
                    />
                    <Text style={styles.errorMessage}>{error}</Text>

                    <Button
                        onPress={onNextPress}
                        title={'Next'}
                        style={{ width: '50%', marginTop: 20 }}
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

export default SignUpUsername