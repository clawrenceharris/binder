import { View, Animated, Modal, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import useColorScheme from '../hooks/useColorScheme';
import { Colors } from '../constants';
import { FC } from 'react';

interface Props {
    showModal: boolean;
    children: JSX.Element;
    onCancel: () => void;
    toValue?: number;
    horizontal?: boolean

}

const SlideModal: FC<Props> = (props) => {
    const { width, height } = useWindowDimensions()
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(0)).current
    const [visible, setVisible] = useState(props.showModal)
    const toggleModal = () => {
        if (props.showModal) {
            setVisible(true)
            Animated.spring(translateValue, {
                toValue: props.toValue,
                duration: 50,
                useNativeDriver: true
            }).start()
        }
        else {

            setTimeout(() => setVisible(false), 400)

            Animated.timing(translateValue, {
                toValue: props.horizontal ? 0 : height,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }


    useEffect(() => {
        toggleModal()

    }, [props.showModal])




    return (
        <Modal
            transparent
            animationType='fade'
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={props.onCancel}>


                <View style={{ flex: 1, backgroundColor: '#00000020', alignItems: 'center', padding: 20 }} >



                    <Animated.View style={{ padding: 20, backgroundColor: Colors[colorScheme].background, width: '80%', borderRadius: 25, justifyContent: 'center', transform: [{ translateY: !props.horizontal && translateValue, translateX: props.horizontal && translateValue }] }} >

                        {props.children}

                    </Animated.View>
                </View>

            </TouchableWithoutFeedback>
        </Modal >

    )
}

export default SlideModal