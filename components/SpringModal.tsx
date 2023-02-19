import { View, Animated, Modal, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import useColorScheme from '../hooks/useColorScheme';
import { Colors } from '../constants';



const SpringModal = ({ showModal, children, onCancel }) => {
    const { width, height } = useWindowDimensions()
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(0)).current
    const [visible, setVisible] = useState(showModal)

    const toggleModal = () => {
        if (showModal) {
            console.log("HEYYYYYYYYYY")
            setVisible(true)
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
        else {

            setTimeout(() => setVisible(false), 140)
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }).start()
        }
    }

    useEffect(() => {
        toggleModal()

    }, [showModal])





    return (
        <Modal

            animationType='fade'
            visible={visible}
            transparent
        >
            <TouchableWithoutFeedback onPress={onCancel}>


                <View style={{ flex: 1, backgroundColor: '#00000020', alignItems: 'center', justifyContent: 'center' }} >


                    <TouchableWithoutFeedback>

                        <Animated.View style={{ padding: 20, backgroundColor: Colors[colorScheme].background, width: '80%', borderRadius: 25, justifyContent: 'center', transform: [{ scale: scaleValue }] }} >


                            {children}

                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View>

            </TouchableWithoutFeedback>
        </Modal >

    )
}

export default SpringModal