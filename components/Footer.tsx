import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import Animated from 'react-native-reanimated'
const ICON_SIZE = 30
const Footer = ({ scrollX, currentIndex, onPress }) => {
    const data = [" ", " ", " "]
    const { width } = Dimensions.get('screen')

    return (
        <View style={{
            backgroundColor: 'black',
            height: '12%',
            justifyContent: 'space-evenly',
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 30,
            paddingVertical: 20



        }}>

            <TouchableOpacity
                activeOpacity={1}

                style={{ padding: 15 }}
                onPress={() => onPress(0)}>


                <Image source={assets.book} style={{ tintColor: currentIndex === 0 ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
            </TouchableOpacity>


            <TouchableOpacity
                activeOpacity={1}
                style={{ padding: 15 }}
                onPress={() => onPress(1)}>


                <Image source={currentIndex < 3 ? assets.capture : assets.desk} style={{ tintColor: currentIndex === 1 || currentIndex === 3 ? Colors.accent : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}

                style={{ padding: 15 }}
                onPress={() => onPress(2)}>

                <Image source={assets.send} style={{ tintColor: currentIndex === 2 ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
            </TouchableOpacity>

        </View>

    )
}

export default Footer