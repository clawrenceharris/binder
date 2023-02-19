import { View, Text, Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { assets, Colors } from '../constants'
import moment from "moment";

import { useNavigation } from '@react-navigation/native'
import ProfileButton from './ProfileButton'


const ClassChatListItem = ({ Class, chatroom, onPress }) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const isMyMessage = () => {
        return message.user.id === 5
    }

    const message = chatroom.messages[chatroom.messages.length - 1];


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.chatContainer, { borderBottomColor: colorScheme === 'light' ? '#F4F4F4' : '#292929', margin: 10 }]} >
                <View style={styles.leftContainer}>
                    <ProfileButton />

                    {/*class name and details*/}
                    <View style={styles.midContainer}>
                        {chatroom.name && chatroom.type === 'group' && <Text style={[styles.className, { color: Colors[colorScheme].tint }]}>{chatroom.name} </Text>}
                        {!chatroom.name && chatroom.type === 'group' && <Text style={[styles.className, { color: Colors[colorScheme].tint }]}>{Class.name} </Text>}

                        {chatroom.type === 'private' && <Text style={[styles.className, { color: Colors[colorScheme].tint }]}>{chatroom.users[0].firstName} </Text>}


                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {!isMyMessage() && <Text style={[styles.firstName, { color: Colors[colorScheme].tint }]}>{message.user.firstName}: </Text>}
                            {isMyMessage() && <Text style={[styles.firstName, { color: Colors[colorScheme].tint }]}>You: </Text>}

                            <Text style={styles.subText}>{message.content}</Text>

                        </View>
                    </View>
                </View>

                <Text style={styles.date}>{moment(message.timestamp).format("MMM, DD")}</Text>

            </View >
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },

    chatContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F4F4F4',
        height: 90,
        width: '100%',
        justifyContent: 'space-between'



    },
    icon: {
        width: 15,
        height: 15,
        tintColor: Colors.light.gray,
    },
    className: {
        fontSize: 18,
        fontFamily: 'Kanit'


    },

    classImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#D4D4D4',
    },

    firstName: {
        color: Colors.light.tint,
        fontWeight: '500',
        fontFamily: 'Kanit'

    },

    subText: {
        color: 'gray',
        fontFamily: 'Kanit'


    },
    messageContent: {
        marginLeft: 10,
        fontFamily: 'Kanit'

    },
    midContainer: {
        marginLeft: 20,
        justifyContent: 'center'

    },


    leftContainer: {
        flexDirection: 'row'
    },
    date: {
        fontSize: 11,
        color: 'gray',

    },

    profileImage: {
        width: 25,
        height: 25
    }
})
export default ClassChatListItem