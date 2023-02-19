import { View, Text } from 'react-native'
import React, { FC, useEffect } from 'react'
import Animated, { Extrapolate } from 'react-native-reanimated'
import { SIZES } from '../constants/Theme'


interface Props {
    animatedValue: Animated.Value<0>
}

const AnimatedHeader: FC<Props> = (props) => {
    const opacity = props.animatedValue.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    });
    useEffect(() => {
        console.log(opacity)


    }, [opacity])


    return (
        <View style={{ position: 'absolute', top: 35, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: SIZES.header }}>
            <Animated.View style={{ borderRadius: 50, backgroundColor: '#00000090', width: 40, height: 40, opacity: opacity }}>

            </Animated.View>
            <Animated.View style={{ borderRadius: 50, backgroundColor: '#00000090', width: 40, height: 40, opacity: opacity }}>

            </Animated.View>
        </View>
    )
}

export default AnimatedHeader