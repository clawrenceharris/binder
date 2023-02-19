import { View, Text, useColorScheme, TextStyle, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Colors } from '../constants'

interface Props {
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    style?: ViewStyle;
    selectionColor?: string;
    keyboardType?: 'number-pad' | 'email-address' | 'decimal-pad' | 'default';
    secureTextEntry?: boolean;
    onBlur?: () => void;
    textStyle?: TextStyle;
    returnKeyType?: 'search' | 'done' | 'go' | 'next'
    placeholderTextColor?: string;
}

const CustomInput: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    return (
        <TextInput
            placeholder={props.placeholder}
            style={[styles.input, { backgroundColor: Colors[colorScheme].gray, color: Colors[colorScheme].tint, ...props.style, ...props.textStyle }]}
            value={props.value}
            onChangeText={(value) => props.onChangeText(value)}
            placeholderTextColor={props.placeholderTextColor || '#999999'}
            selectionColor={props.selectionColor || Colors.accent}
            keyboardType={props.keyboardType}
            onBlur={props.onBlur}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKeyType}
        />


    )
}



const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: 'black',
        backgroundColor: '#EFEFEF',
        borderRadius: 25
    },

    erroMessage: {
        color: 'red',
        alignSelf: 'stretch'
    }
})
export default CustomInput