import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { StyleSheet } from 'react-native'

const ICON_SIZE = 25;

const ActivePeople = ({ userCount, activeCount }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 50, borderColor: 'white' }} />
            <Text style={[styles.number, { color: Colors[colorScheme].tint }]}>{activeCount}</Text>
            <Image source={assets.person} style={{ width: 12, height: 12, tintColor: colorScheme === 'light' ? 'black' : 'white', marginLeft: 10 }} />
            <Text style={[styles.number, { color: Colors[colorScheme].tint }]}>{userCount}</Text>

        </View>

    )
}
const styles = StyleSheet.create({


    icon: {
        tintColor: Colors.light.tint,
        width: ICON_SIZE,
        height: ICON_SIZE

    },
    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'



    },

    className: {
        fontSize: 20,
        fontWeight: '800',
        margin: 10,


    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },

    number: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 5,
        fontFamily: 'Kanit'
    }


})
export default ActivePeople