import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { FC, useRef } from 'react'
import { haptics } from '../utils'


interface Props {
    type?: 'in-out' | 'out-in'
    children: JSX.Element
    disabled?: boolean
    onPress?: () => void
    onLongPress?: () => void
    toValue?: number
}
const ScaleButton: FC<Props> = (props) => {
    const scaleValue = useRef(new Animated.Value(1)).current
    const grow = () => {

        Animated.timing(scaleValue,
            {
                toValue: props.toValue || 1.1,
                duration: 150,
                useNativeDriver: true
            }).start()


    }
    const shrink = () => {
        Animated.timing(scaleValue, {
            toValue: props.toValue || 0.5,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const retainSize = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const onButtonPressIn = () => {

        if (!props.disabled) {
            if (props.type || 'out-in' === 'out-in') {
                grow()
            }
            else {
                shrink()
            }
        }

    }
    const onButtonPressOut = () => {

        if (!props.disabled) {
            if (props.type || 'out-in' === 'out-in') {
                retainSize()
            }
            else {
                retainSize()
            }
        }


    }

    const onButtonPress = () => {
        if (!props.disabled) {
            props.onPress()
        }
    }
    const onButtonLongPress = () => {
        if (!props.disabled) {
            retainSize()
            haptics('light')
            props.onLongPress()
        }
    }

    return (

        <TouchableWithoutFeedback
            onPressOut={onButtonPressOut}
            onPressIn={onButtonPressIn}
            onPress={onButtonPress}
            onLongPress={onButtonLongPress}
        >

            <Animated.View style={{ alignItems: 'center', width: '100%', transform: [{ scale: scaleValue }] }}>

                {props.children}


            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default ScaleButton