import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'

const ToggleButton = ({ size = 30, onToggle, isOn }) => {

    const [on, setOn] = useState(isOn)
    const [toValue, setToValue] = useState(0)

    const value = useSharedValue(0)



    const toggle = () => {

        onToggle();

        if (!on) {
            setOn(true)
            setToValue(0)

        }

        else {
            setOn(false)
            setToValue(size - 5)
        }
        value.value = withTiming(toValue, { duration: 200 })

    }
    const animatedProps = useAnimatedProps(() => {
        return { left: value.value }


    })

    return (

        <TouchableWithoutFeedback
            onPress={toggle}
        >
            <View style={{ width: size * 2, backgroundColor: !on ? '#646464' : Colors.light.primary, borderRadius: 100, padding: 3, overflow: 'hidden' }}>
                <Animated.View animatedProps={animatedProps} style={{ width: size, height: size, backgroundColor: 'white', borderRadius: 100, ...SHADOWS.dark, shadowColor: 'black', shadowRadius: 10, shadowOpacity: 0.6 }} />
            </View>
        </TouchableWithoutFeedback>


    )
}

export default ToggleButton