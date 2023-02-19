import { View, Text, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle, TouchableOpacity, Animated } from 'react-native'
import React, { Component, FC, ReactNode, useRef } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';

interface ProfileButtonProps {
    onPress?: () => void;
    showsName?: boolean;
    buttonStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    badgeContainerStyle?: ViewStyle;
    nameStyle?: TextStyle;
    size?: number;
    imageURL?: string
    defaultImage?: ImageSourcePropType;
    badge?: ReactNode;
    name?: string;
    defaultImageStyle?: ImageStyle;
    imageStyle?: ImageStyle;
    imageContainerStyle?: ViewStyle;

}
const BUTTON_SIZE = 50
//A profile button component that represents a user or a group profile and can be clicked on to navigate to their profile screen
const ProfileButton: FC<ProfileButtonProps> = (props) => {

    const animationDuration = 80
    const colorScheme = useColorScheme()
    const scaleValue = useRef(new Animated.Value(1)).current
    const animate = () => {
        Animated.sequence([

            Animated.timing(scaleValue, {
                toValue: 0.8,
                duration: animationDuration,
                useNativeDriver: true
            }),

            Animated.timing(scaleValue,
                {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: true
                })

        ]).start()
    }


    const onPress = () => {
        animate()
        setTimeout(() => props.onPress(), animationDuration)
    }

    return (



        <View style={
            { flexDirection: 'row', alignItems: 'center', ...props.containerStyle }

        }>


            <TouchableWithoutFeedback
                onPress={onPress}

                style={[styles.buttonContainer, { backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint, width: props.size || 40, height: props.size || 40, ...props.buttonStyle }]}>
                <View>


                    <Animated.View
                        style={[styles.imageContainer, { backgroundColor: Colors[colorScheme].lightGray, width: props.size || 40, height: props.size || 40, transform: [{ scale: scaleValue }], ...props.imageContainerStyle }]}>
                        {
                            props.imageURL != null ?

                                <Image
                                    source={{ uri: props.imageURL }}
                                    style={[styles.image, { width: props.size * 1.3 || BUTTON_SIZE, height: props.size * 1.3 || BUTTON_SIZE, ...props.imageStyle }]} />
                                :
                                <Image
                                    source={props.defaultImage || assets.person}
                                    style={[styles.defaultImage, { width: props.size - 5 || BUTTON_SIZE, height: props.size - 5 || BUTTON_SIZE, ...props.defaultImageStyle, }]} />
                        }
                    </Animated.View>


                    <View style={[
                        styles.badgeContainer, {
                            ...props.badgeContainerStyle,
                        }]}>


                        {props.badge}


                    </View>
                </View>
            </TouchableWithoutFeedback>
            {
                props.showsName &&
                <Text
                    numberOfLines={2}
                    style={{ fontFamily: 'KanitSemiBold', fontSize: 18, color: Colors[colorScheme].tint, marginLeft: 10, maxWidth: '70%', ...props.nameStyle }}>
                    {props.name}
                </Text>
            }

        </View>

    )
}


const styles = StyleSheet.create({

    buttonContainer: {

        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',


    },

    defaultImage: {
        resizeMode: 'cover',
        tintColor: '#00000050',


    },

    image: {
        resizeMode: 'cover',

    },

    imageContainer: {
        borderRadius: 100,

        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',


    },

    badgeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        padding: 2

    }



})
export default ProfileButton