import { View, Text } from 'react-native'
import React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const NotesHeader = ({ route }) => {
    const notes = route.params.notes
    const colorScheme = useColorScheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'KanitMedium', fontSize: 22, marginTop: 25, color: Colors[colorScheme].tint }}>{notes.title}</Text>

        </View>
    )
}

export default NotesHeader