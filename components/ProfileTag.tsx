import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const ProfileTag = ({ icon, title, onPress, ...props }) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                backgroundColor: '#00000010',
                borderWidth: 1,
                borderColor: '#00000030',
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10
            }}>
                {icon}
                <Text style={{ color: '#9BA0A6', marginLeft: 4 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ProfileTag