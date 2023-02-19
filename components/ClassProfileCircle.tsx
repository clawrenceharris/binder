import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const IMAGE_SIZE = 35;
const ClassProfileCircle = ({ Class, showStoryBoder, story, size, showName, bold, chatroom }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()



    const goToProfile = () => {
        navigation.navigate('Profile', { user: undefined, class: Class })

    }
    return (
        <TouchableWithoutFeedback onPress={goToProfile}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {showStoryBoder && <View style={{ position: 'absolute', width: size + 10, height: size + 10, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.light.primary, zIndex: 0 }}>
                </View>}

                <View style={{ width: size + 10, height: size + 10, backgroundColor: 'lightgray', borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                    {Class?.image ?
                        <Image source={Class.image} style={[styles.image, { width: size, height: size }]} />
                        :
                        <Image source={assets.book} style={[styles.defaultImage, { width: size - (size / 3), height: size - (size / 3) }]} />}

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'contain',
        position: 'absolute',
        tintColor: '#f4f4f4',
    },

    image: {
        resizeMode: 'contain',
        position: 'absolute',
    },



})
export default ClassProfileCircle