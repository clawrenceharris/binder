import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const CircleButton = ({ onPress, source, activeOpacity = 0.8, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={activeOpacity}
            style={[styles.container, { ...style }]}>
            <Image source={source} style={{ width: 20, height: 20, tintColor: 'white' }} />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00000030',
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center'
    }
})

export default CircleButton