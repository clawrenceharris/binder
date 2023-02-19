import { View, Text, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, StyleSheet, } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import PollOptions from '../constants/data/PollOptions'
import OptionsList from './OptionsList'

interface Props {
    showModal: boolean
    options: string[]
    onOptionPress: (() => void)[]
    isOn?: boolean;
    onToggle?: () => void
    onCancelPress: () => void
    switchIndex?: number
    redIndex?: number
    toValue?: number


}

const OptionsModal: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const modalHeight = 150
    const { width, height } = useWindowDimensions();

    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: props.toValue ? props.toValue : -1 * (modalHeight + 100),
                duration: 400,
                useNativeDriver: true,

            }).start();
    }


    function slideOut() {
        Animated.timing(
            translateValue,
            {

                toValue: 900,
                duration: 500,
                useNativeDriver: true,

            }).start();
    }

    const cancelOption = {


        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Colors[colorScheme].background,
        marginTop: 10,
        borderRadius: 15

    }
    return (
        <Modal
            transparent
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}
        >


            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center', padding: 10 }} >


                <Animated.View style={{ alignSelf: 'center', height: 20 * 50, width: '100%', marginTop: height, padding: 20, transform: [{ translateY: translateValue }], }}>


                    <OptionsList
                        options={props.options}
                        onOptionPress={props.onOptionPress}
                        redIndex={props.redIndex}
                        switchIndex={props.switchIndex}
                        onToggle={props.onToggle}
                        isOn={props.isOn}
                    />


                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={props.onCancelPress}
                        style={{ ...cancelOption }}>
                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: Colors[colorScheme].tint }}>{"Done"}</Text>

                    </TouchableOpacity>



                </Animated.View >

            </View>


        </Modal>
    )
}


export default OptionsModal