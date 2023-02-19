import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Animated from 'react-native-reanimated'
import { duration } from 'moment'

const EmojiRain = ({ emoji, count, active }) => {
    const emojis = []
    const translateValue = useRef(new Animated.Value(0)).current
    const layout = useWindowDimensions()
    for (let i = 0; i < count; i++) {
        emojis.push(emoji)
    }
    const rain = () => {
        Animated.spring(translateValue, {
            toValue: layout.height,
            duration: 3000,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {

        rain()




    }, [])

    return (
        <View>
            {emojis.map(item => (
                <Animated.View style={{ transform: [{ translateY: translateValue }] }}>
                    <Text>{item}</Text>
                </Animated.View>
            ))}
        </View>
    )
}

export default EmojiRain