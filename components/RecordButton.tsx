import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Colors } from '../constants'
import Animated from 'react-native-reanimated'

const RecordButton = () => {
    const animatedScale = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.spring(animatedScale, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }


    const animatedScaleStyle = {
        transform: [{ translateX: animatedScale }]
    };
    return (

        <TouchableOpacity style={styles.outerCircle} onPressIn={handlePressIn}>
            <Animated.View style={animatedScaleStyle}>
                <View style={styles.innerCircle}>

                </View>
            </Animated.View>


        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    circle: {
        position: 'absolute'
    },

    outerCircle: {
        borderColor: '#ffffff4D',
        borderWidth: 10,
        width: 90,
        height: 90,
        borderRadius: 50,
        bottom: '5%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    innerCircle: {
        width: 55,
        height: 55,
        backgroundColor: Colors.light.primary,
        borderRadius: 50
    }
})

export default RecordButton