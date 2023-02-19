import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/index.ts';
import useColorScheme from '../hooks/useColorScheme';

const Classmates = () => {
    const colorScheme = useColorScheme();

    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: Colors[colorScheme].tint }} >Classmates</Text>
        </View>
    )
}

export default Classmates