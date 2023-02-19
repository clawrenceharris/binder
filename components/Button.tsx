import { View, Text, StyleSheet, Animated, TouchableOpacity, TextStyle, ViewStyle, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { FC, useRef } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'


/*Renders a styled button 
@param condition: boolean to control whether the button should be touchable
@param onPress: Function that will be called when the button is pressed
@param title: The title of the button
@param backgroud: The background color of the button- defaults to primary color
@param tint: the text color of the button - defualts to white
*/

interface Props {
    onPress: () => void;
    titleStyle?: TextStyle;
    title?: string;
    icon?: JSX.Element;
    disabled?: boolean;
    style?: ViewStyle;
    background?: string;
    tint?: string;
    loading?: boolean;
    animated?: boolean;



}
const Button: FC<Props> = (props) => {
    const scaleValue = useRef(new Animated.Value(1)).current
    const grow = () => {

        Animated.timing(scaleValue,
            {
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true
            }).start()


    }
    const shrink = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const onButtonPress = () => {

        if (!props.disabled) {
            props.onPress()
        }

    }

    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 50,
            alignSelf: 'center',
            backgroundColor: !props.disabled ? props.background || Colors.accent : Colors.accent + '70',
            padding: 5,
            paddingHorizontal: 40,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 50,

        },
        title: {
            color: !props.disabled ? props.tint || Colors.white : '#ffffff70',
            fontFamily: "KanitMedium",
            fontSize: 20
        }
    })
    return (
        <TouchableWithoutFeedback
            onPressIn={() => { if (!props.disabled) grow() }}
            onPressOut={() => { if (!props.disabled) shrink() }}
            onPress={onButtonPress}

        >

            <Animated.View style={[styles.buttonContainer, { ...props.style, transform: [{ scale: scaleValue }] }]}>

                {!props.icon && !props.loading ?
                    <Text {...props.titleStyle} style={styles.title}>{props.title}</Text> : props.icon}
                {props.loading &&
                    <ActivityIndicator color={props?.tint || Colors.white} size={'small'} />
                }


            </Animated.View>
        </TouchableWithoutFeedback>

    )


}

export default Button