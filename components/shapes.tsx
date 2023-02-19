import React from "react"
import { StyleSheet, View } from "react-native"

export const TwelvePointBurst = (props) => {
    const styles = StyleSheet.create({
        twelvePointBurst: {},
        twelvePointBurstMain: {
            width: props.size || 80,
            height: props.size || 80,
        },
        twelvePointBurst30: {
            width: props.size || 80,
            height: props.size || 80,
            position: 'absolute',
            top: 0,
            right: 0,
            transform: [
                { rotate: '30deg' }
            ]
        },
        twelvePointBurst60: {
            width: props.size || 80,
            height: props.size || 80,
            position: 'absolute',
            top: 0,
            right: 0,
            transform: [
                { rotate: '60deg' }
            ]
        },
    })
    return (
        <View style={[styles.twelvePointBurst, { ...props.style }]}>
            <View style={[styles.twelvePointBurstMain, { backgroundColor: props.color }]} />
            <View style={[styles.twelvePointBurst30, { backgroundColor: props.color }]} />
            <View style={[styles.twelvePointBurst60, { backgroundColor: props.color }]} />
            {props.children}
        </View>
    )
}



