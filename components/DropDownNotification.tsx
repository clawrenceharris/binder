import { View, Animated, Modal, useWindowDimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import useColorScheme from '../hooks/useColorScheme';
import { Colors } from '../constants';



const DropDownNotification = (props) => {
    const { width, height } = useWindowDimensions()
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const [visible, setVisible] = useState(props.showNotification)

    const toggleModal = () => {
        if (props.showNotification) {
            setVisible(true)
            Animated.spring(translateValue, {
                toValue: '40%',
                duration: 500,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                Animated.timing(translateValue, {
                    toValue: 0 - 100,
                    duration: 500,
                    useNativeDriver: true
                }).start()


            }, 2000)
            setTimeout(() => {
                setVisible(false)
            }, 3000)
        }
        else {



        }
    }


    useEffect(() => {
        toggleModal()

    }, [props.showNotification])




    return (





        <View style={{ padding: 10, zIndex: 2, position: 'absolute', width: '100%', }}>


            {visible && <Animated.View style={[styles.notificationContainer, { backgroundColor: Colors[colorScheme].background, transform: [{ translateY: translateValue }], ...props.style }]} >

                {props.children}

            </Animated.View>}

        </View>

    )
}
const styles = StyleSheet.create({
    notificationContainer: {
        padding: 10,




        borderRadius: 15,
        justifyContent: 'center',
    }
})
export default DropDownNotification