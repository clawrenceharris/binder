import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const Active = ({ timestamp }) => {

    const colorScheme = useColorScheme();
    const shorten = (timestamp) => {
        if (timestamp === 'a few seconds ago') {
            return 'now'
        }
        else {
            return timestamp
        }
    }
    return (
        <View style={{ backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#EFEFEF', borderRadius: 20, padding: 5 }}>
            <View style={{ backgroundColor: '#7FF449', position: 'absolute', width: 20, height: 20, borderRadius: 50, left: '100%', borderWidth: 4, borderColor: Colors[colorScheme].background, top: -10 }}></View>

            <Text style={{ color: 'gray', fontWeight: '500' }}>Active {shorten(moment(timestamp).fromNow())}</Text>
        </View>
    )
}

export default Active