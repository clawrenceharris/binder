import { View, Text, ViewStyle, } from 'react-native'
import React, { FC, useState } from 'react'
import { Switch } from 'react-native-paper'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'
import ProfileButton from './ProfileButton'
import ToggleSwitch from 'toggle-switch-react-native'
import { User } from '../types'


interface Props {
    user: User;
    action: string;
    style?: ViewStyle;
    isOn: boolean;
    onToggle: () => void;

}
const ToggleAnonymity: FC<Props> = (props) => {
    const colorScheme = useColorScheme()

    return (

        <View style={{ width: '100%', padding: 10, backgroundColor: colorScheme === 'light' ? '#FAFAFA50' : '#00000080', borderRadius: 15, borderWidth: 1, borderColor: Colors[colorScheme].gray, ...props.style }}>
            <Text style={{ marginBottom: 5, fontFamily: 'KanitMedium', fontSize: 18, color: Colors[colorScheme].veryDarkGray }}>{props.action + " As:"}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                <ProfileButton
                    name={props.isOn ? props.user?.displayName : 'Anonymous'}
                    showsName
                    imageURL={props.isOn ? props.user?.photoURL : null}
                />
                <Switch value={props.isOn} color={Colors.accent} onValueChange={props.onToggle} />
            </View>

        </View>
    )
}

export default ToggleAnonymity