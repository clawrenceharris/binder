import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants/index';
import moment from 'moment';
import DeskItemPreview from './DeskItemPreview';
import useColorScheme from '../hooks/useColorScheme';
import { Chat } from '../types';
import PollMessage from './PollMessage';
import { getDisplayNameOrYou } from '../utils';
import ProfileButton from './ProfileButton';
import { SHADOWS } from '../constants/Theme';


interface Props {
    chat: Chat;
    previousChat: Chat;
    onLongPress: () => void;
    onDeskItemPress: (deskItem: object, deskCategory: string) => void;
    showsTime: boolean;
    index: number;
    onProfileButtonPress: () => void
}


const ChatMessage: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    const isEmojiText = (chat) => {
        const emojiRegex = /\p{Emoji}/u;


        for (let i = 0; i < chat.length; i++) {
            if (emojiRegex.test(chat) === false) {
                return false
            }
        }

        return true
    }

    const isSameUser = () => {
        return props.previousChat != undefined && props?.previousChat.user.uid === props.chat.user.uid
    }

    const styles = StyleSheet.create({



        name: {
            color: 'gray',
            fontFamily: 'Kanit',
            marginBottom: 5,
            marginLeft: 40,
            fontSize: 14
        },

        time: {
            alignSelf: "flex-end",
            color: 'grey'
        },



        text: {
            fontFamily: 'KanitMedium',
            color: Colors[colorScheme].tint,
            fontSize: 14,


        },

        middleContainer: {
            marginTop: !isSameUser() ? 20 : 5,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderRadius: 10
        },

        chatContainer: {
            paddingHorizontal: 10,
            padding: 5,
            backgroundColor: colorScheme === 'light' ? 'white' : Colors.light.tint,
            ...SHADOWS[colorScheme],
            borderRadius: 10
        }
    })


    return (
        <View>

            {!props.chat.isSystem ?

                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={() => props.onLongPress()}
                    delayLongPress={300}>

                    <React.Fragment>
                        <View style={{ flexDirection: 'row' }}>


                            {!isSameUser() && <Text style={[styles.name]}>{getDisplayNameOrYou(props.chat.user)}</Text>}


                            {!isSameUser() && props.showsTime && <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 12, position: 'absolute', right: 10, bottom: 0 }}>{moment(props.chat.createdAt.toDate()).format('LT')}</Text>}


                        </View>



                        <View style={[styles.middleContainer]}>



                            {!isSameUser() &&
                                <ProfileButton
                                    imageURL={props.chat?.user?.photoURL}
                                    size={25}
                                    onPress={props.onProfileButtonPress}
                                />
                            }

                            {
                                props.chat.contentType === "notes" || props.chat.contentType === "flashcards" &&
                                <View
                                    style={{ left: isSameUser() ? 35 : 10 }}
                                >
                                    <DeskItemPreview
                                        item={props.chat.deskItem}
                                        onLongPress={() => { }}
                                        onMorePress={() => { }}
                                        deskType={props.chat.contentType}
                                        onPress={() => props.onDeskItemPress(props.chat.deskItem, 'Notes')}
                                    />
                                </View>

                            }
                            {
                                props.chat.contentType === "poll" &&

                                <PollMessage poll={props.chat.poll} style={{ marginLeft: 10 }} />
                            }


                            {props.chat.text != '' &&
                                <View style={{ flexDirection: 'row', width: '90%', left: isSameUser() ? 35 : 10 }}>
                                    <View style={styles.chatContainer}>
                                        <Text style={styles.text}>{props.chat?.text}</Text>
                                    </View>
                                </View>
                            }




                            {/* {
                                props.chat.contentType === "burning question" &&

                                // <DeskItemPreview item={Notes[0]} onLongPress={undefined} margin={undefined} onMorePress={undefined} deskCategory={undefined} showBookmarked={undefined} />} */}

                            {props.chat.reactions.length > 0 &&

                                <View style={{ flexDirection: 'row', borderRadius: 25, paddingHorizontal: 5, marginTop: -10, position: 'absolute', right: 10 }}>

                                    {props.chat.reactions.map((item, index) =>
                                        <View key={index.toString()} style={{ ...SHADOWS[colorScheme], backgroundColor: 'white', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginLeft: -10 }}>
                                            <Text style={{ fontSize: 12 }}>{item.reaction}</Text>
                                        </View>

                                    )}
                                </View>}
                        </View >





                    </React.Fragment>
                </TouchableOpacity>

                :
                <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center', fontSize: 10 }}>{props.chat?.text}</Text>

                </View>
            }

        </View>




    )
}

export default ChatMessage