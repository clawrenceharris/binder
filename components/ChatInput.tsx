import React, { FC, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { assets, Colors } from '../constants';
import { Image } from 'react-native';
import { BurningQuestion, Chatroom, ChatroomUser } from '../types';
import { auth, db } from '../Firebase/firebase';
import { getDisplayNameOrYou } from '../utils';
import useColorScheme from '../hooks/useColorScheme';
import StyledTextInput from './StyledTextInput';


interface Props {
    onSendPress: (type: string, message: string) => void;
    onCameraPress: () => void;
    onChangeMessage: (value: string) => void;
    onDeskPress: () => void;
    message: string;
    deskItem: object;
    children?: JSX.Element;
    onChatOptionPress: (emoji: string, option: string) => void;
    content?: JSX.Element;

}

const ChatInput: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    const [message, setMessage] = useState(props.message)
    const [selectedChatOption, setSelectedChatOption] = useState('')
    const gameButton = '🎮'
    const pollButton = '👍👎'
    const burningQuestionButton = '🔥'
    const cookieButton = '🍪'
    const onChatBubblePress = () => {

        console.log("chat bubble pressed")
    }
    useEffect(() => {
        setMessage(props.message)

    }, [props.message])


    const onSendPress = (content) => {
        props.onSendPress('text', message)

        setMessage('');
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} >
            {props.children}



            <View style={styles.container}>


                <View>


                    <StyledTextInput
                        icon={<View style={styles.cameraButton}>
                            <TouchableOpacity onPress={props.onCameraPress}>
                                <Image source={assets.camera} style={{ width: 25, height: 25, tintColor: 'white' }} />

                            </TouchableOpacity>

                        </View>}
                        content={props.content}
                        placeholder={`Message...`}
                        multiline
                        value={message}
                        enablesReturnKeyAutomatically
                        onChangeText={(value) => { setMessage(value); props.onChangeMessage(value) }}
                        placeholderTextColor={Colors.light.darkGray}
                        selectionColor={Colors.primary}
                        autoFocus
                        rightIcon={

                            !message && !props.content ? <View style={styles.rightContainer}>
                                <MaterialCommunityIcons name="microphone" size={28} color={Colors[colorScheme].darkGray} style={styles.icon} />
                                <MaterialCommunityIcons name="image" size={28} color={Colors[colorScheme].darkGray} />
                                <TouchableOpacity onPress={props.onDeskPress}>
                                    <Image source={assets.desk} style={{ width: 28, height: 28, tintColor: Colors[colorScheme].darkGray, marginLeft: 10 }} />

                                </TouchableOpacity>
                            </View>
                                : <TouchableOpacity
                                    style={{ paddingHorizontal: 10, padding: 4, backgroundColor: Colors.white, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={onSendPress} >


                                    <Text style={{
                                        fontWeight: 'bold', fontSize: 16, color: Colors.primary, fontFamily: 'KanitMedium'
                                    }} >{"Send"}</Text>
                                </TouchableOpacity>



                        }
                    />

                </View>



            </View>
            <View style={{ padding: 15, flexDirection: 'row', marginBottom: 30 }}>
                <TouchableWithoutFeedback onPress={() => props.onChatOptionPress(burningQuestionButton, 'Burning Question')}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#ffffff90', width: '25%' }}>


                        <Text style={{ fontSize: 18 }}>{burningQuestionButton}</Text>

                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.onChatOptionPress(pollButton, 'Poll')}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#ffffff90', width: '25%' }}>

                        <Text style={{ fontSize: 18 }}>{pollButton}</Text>

                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.onChatOptionPress(cookieButton, 'Request Cookies')}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#ffffff90', width: '25%' }}>

                        <Text style={{ fontSize: 18 }}>{cookieButton}</Text>

                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.onChatOptionPress(gameButton, 'New Game')}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '25%' }}>

                        <Text style={{ fontSize: 18 }}>{gameButton}</Text>


                    </View>
                </TouchableWithoutFeedback>

            </View>



        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({

    container: {
        padding: 10,


    },
    textContainer: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 25,
        backgroundColor: Colors.light.tint,
        maxHeight: 160,
        marginBottom: 20,
        alignItems: 'center',

    },
    textInput: {
        marginHorizontal: 10,
        flex: 1,
        fontFamily: 'Kanit',
        fontSize: 16,
        color: Colors.white
    },
    icon: {
        marginHorizontal: 5,
    },

    rightContainer: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
    },
    cameraButton: {
        borderRadius: 50,
        backgroundColor: Colors.accent,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ChatInput