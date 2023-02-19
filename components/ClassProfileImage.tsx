import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'

const ClassProfileImage = ({ Class }) => {
    return (
        <View style={{ width: 60, height: 60, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.light.primary }}>
            <View style={{ width: 50, height: 50, backgroundColor: '#F4F4F4', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Class.image} style={styles.classImage} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 25, height: 25, backgroundColor: Colors.light.background, borderRadius: 50, borderWidth: 3, borderColor: 'white', top: '75as%' }}>
                <Image source={assets.crowd} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />

            </View>


        </View>
    )
}
const styles = StyleSheet.create({



    classImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#D4D4D4',
    },



})
export default ClassProfileImage