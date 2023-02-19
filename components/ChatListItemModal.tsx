import { View, Text, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'

const ChatListItemModal = (props) => {
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const modalHeight = 200
    const { width, height } = useWindowDimensions();

    const padding = 40




    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: -1 * (modalHeight + 60 + padding),
                duration: 500,
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



    return (
        <Modal
            transparent
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}



        >

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center', padding: 20 }} >


                <Animated.View style={{ alignSelf: 'center', height: 150, width: '100%', marginTop: height, padding: 20, transform: [{ translateY: translateValue }], }}>

                    <View style={{ padding: 15, width: '100%', borderBottomColor: '#474747', borderBottomWidth: 1, backgroundColor: '#333', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>

                        <TouchableOpacity
                            onPress={props.onPinPress}
                        >
                            <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>Pin</Text>

                        </TouchableOpacity>
                    </View>


                    <View style={{ padding: 15, width: '100%', backgroundColor: '#333', borderBottomColor: '#474747', borderBottomWidth: 1, }}>

                        <TouchableOpacity
                            onPress={props.onMutePress}
                        >
                            <Text
                                style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}
                            >Mute</Text>

                        </TouchableOpacity>
                    </View>





                    <View style={{ padding: 15, width: '100%', backgroundColor: '#333', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>

                        <TouchableOpacity
                            onPress={props.onDeletePress}
                        >
                            <Text
                                style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}
                            >Delete</Text>

                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity onPress={props.onCancelPress} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: '100%', padding: 10, backgroundColor: '#333', marginTop: 10, borderRadius: 25 }}>
                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>



                </Animated.View >

            </View>


        </Modal>
    )
}

export default ChatListItemModal