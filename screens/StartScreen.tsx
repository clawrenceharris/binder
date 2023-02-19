import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import Button from '../components/Button'
import { SHADOWS } from '../constants/Theme'

const StartScreen = ({ navigation }) => {
    const onSignUpPress = () => {
        navigation.navigate('SignUpEmail')
    }
    const onLogInPress = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={{ backgroundColor: Colors.primary, flex: 1 }}>

            <ImageBackground source={assets.school_background} style={{ flex: 1 }}>



                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>



                    <Image source={assets.logo} style={{ width: 180, height: 180 }} />
                    <View style={{ width: '100%', alignItems: 'center', padding: 50 }}>
                        <Button
                            onPress={onLogInPress}
                            style={{ marginTop: 20, width: '70%' }}
                            title={'Log In'}
                            animated


                        />
                        <Button
                            onPress={onSignUpPress}
                            style={{ marginTop: 20, width: '70%', backgroundColor: 'white' }}
                            tint={'black'}
                            title={'Sign Up'}
                            animated

                        />



                    </View>


                </View>
            </ImageBackground>

        </View>
    )
}

export default StartScreen