import { View, Text, Animated, Pressable, StyleSheet, TouchableOpacity, PanResponder, Image } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import { Colors } from '../constants';
import { useSharedValue } from 'react-native-reanimated';
import { SHADOWS } from '../constants/Theme';
import useColorScheme from '../hooks/useColorScheme';

const FlippableFlashcard = (props) => {

    let flipRotation = 0
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const colorScheme = useColorScheme();
    flipAnimation.addListener(({ value }) => {
        flipRotation = value
    })
    useEffect(() => {

        flipToFront()

    }, [])

    const flipToFront = () => {
        Animated.spring(flipAnimation, {
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start();
    }

    const flipToBack = () => {
        Animated.spring(flipAnimation, {
            toValue: 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start();
    }
    const flipCard = () => {
        if (flipRotation >= 90) {
            flipToFront();
        }
        else {
            flipToBack();
        }

    }


    const flipToFrontStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }
        ]
    };
    const flipToBackStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }
        ]
    };

    return (

        <TouchableOpacity
            activeOpacity={1}
            onPress={flipCard}
            style={[styles.cardContainer, { marginBottom: 40, ...SHADOWS[colorScheme], ...props.containerStyle }]}>
            <View>

                <Animated.View style={{ ...styles.flipCard, ...flipToFrontStyle, width: props.width || 320, height: props.height || 180 }}>
                    {
                        !props.card.cardFront.isImage ?
                            <Text style={styles.term}>{props.card.cardFront.data}</Text>
                            :
                            <Image source={{ uri: props.card.cardFront.data }} style={{ width: '90%', height: '90%', borderRadius: 10, resizeMode: 'contain' }} />
                    }
                </Animated.View>

                <Animated.View style={{ ...styles.flipCard, ...flipToBackStyle, ...styles.cardBack, width: props.width || 320, height: props.height || 180 }}>
                    {!props.card.cardBack.isImage ?
                        <Text numberOfLines={10} style={styles.definition}>{props.card.cardBack.data}</Text>
                        :
                        <Image source={{ uri: props.card.cardBack.data }} style={{ width: '100%', height: '90%', resizeMode: 'contain' }} />

                    }
                </Animated.View>


            </View>

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    flipCard: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        backfaceVisibility: 'hidden'

    },

    cardContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },

    term: {
        color: Colors.accent,
        fontSize: 28,
        textAlign: 'center',
        width: "100%",
        alignSelf: 'center',
        fontFamily: 'KanitBold',
        backfaceVisibility: 'hidden'
    },

    definition: {
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
        width: '80%',
        marginLeft: 20,


        alignSelf: 'center',
        fontFamily: 'Kanit'
    },

    cardFront: {
        padding: 10,


        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center'

    },
    cardBack: {
        position: 'absolute'


    },
})


export default FlippableFlashcard
