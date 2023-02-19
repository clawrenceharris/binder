import { View, Text, Image, StyleSheet, FlatList, ScrollView, Keyboard, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { assets, Colors } from '../constants'
import Chat from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import { auth, db } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { ProfileButton } from '../components'
import moment from 'moment'
import CallButton from '../components/CallButton'
import ChatModal from '../components/ChatModal'
import { getDisplayNameOrYou } from '../utils'
import useColorScheme from '../hooks/useColorScheme'
import { ActivityBadge } from '../components/ProfileBadges'
import { useNavigation } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import CollapsibleView from "@eliav2/react-native-collapsible-view";

import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { SHADOWS, SIZES } from '../constants/Theme'
import { ConfirmationModal, SubmitModal } from '../components/Modals'
import ModalComponent from '../components/Modal'
import CustomBottomSheet from '../components/CustomBottomSheet'
import SpringModal from '../components/SpringModal'
import SlideModal from '../components/SlideModal'
import ToggleAnonymity from '../components/ToggleAnonymity'
import StyledTextInput from '../components/StyledTextInput'
import BurningQuestion from '../components/BurningQuestion'


const Chatroom = (props) => {
    const [message, setMessage] = useState("")
    const [chats, setChats] = useState([])
    const [chatroom, setChatroom] = useState(null)
    const [ref, setRef] = useState(null)
    const [burningQuestion, setBurningQuestion] = useState(null)
    const { id, name } = props.route.params
    const [showChatOptionModal, setShowChatOptionModal] = useState(false)

    const colors = [
        Colors.accent,
        Colors.yellow,
        Colors.red,
        Colors.blue,
        Colors.red,
        Colors.green,
        Colors.pink,
        Colors.orange
    ]
    const [chatOption, setChatOption] = useState('')
    const [users, setUsers] = useState([])
    const [showChatActionsModal, setShowChatActionsModal] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null)
    const [showTimestamp, setShowTimestamp] = useState(false)
    const [deskItem, setDeskItem] = useState(null)
    const colorScheme = useColorScheme()

    useLayoutEffect(() => {

        const subscriber = db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .orderBy("createdAt", "asc")
            .onSnapshot(snapshot => {
                const chats = snapshot.docs.map((doc) => {
                    const id = doc.id
                    const data = doc.data()

                    return { id, ...data }
                })
                setChats(chats)
            })
        return subscriber
    }, [props.route])

    useEffect(() => {
        const users = []
        // set the chatroom data
        db.collection('chatrooms')
            .doc(id)
            .get()
            .then(doc => {
                doc.data().users.forEach(user => {
                    db.collection('users')
                        .doc(user)
                        .get()
                        .then(doc => {
                            users.push(doc.data())
                            setUsers(users)
                        })

                })

                setChatroom(doc.data())


            })



    }, [])


    const onSendPress = (contentType, text) => {

        //add the chat object to this chatroom
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .add({

                createdAt: new Date(),
                contentType: contentType,
                text,
                deskItem: null,
                user: auth.currentUser.uid,
                reactions: [],
                isSystem: false
            })



    }
    const onDeskItemSendPress = (contentType, deskItem, text) => {
        //add the chat object to this chatroom
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .add({
                createdAt: new Date(),
                contentType: contentType,
                text: text,
                deskItem: deskItem,
                user: db.collection('users').doc(auth.currentUser.uid),
                reactions: [],
                isSystem: false

            })


    }
    const getDefaultImage = () => {
        switch (chatroom?.type) {
            case 'private': return assets.person
            case 'group': return assets.group
            case 'class': return assets.book
            case 'school': return assets.school


        }
    }
    console.log(chatroom)
    const headerLeft = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton
                navigation={props.navigation}
                direction='horizontal'
                color={Colors.white}
            />


            <ProfileButton
                size={40}
                imageURL={users[0]?.photoURL}
                defaultImage={getDefaultImage()}
                onPress={function (): void {
                    props.navigation.navigate('Profile', { uid: users[0]?.uid })
                }}
                name={name}
                nameStyle={{ color: Colors.white }}
                showsName
                containerStyle={{ marginLeft: 5 }}


            />



        </View>
    )




    const onDeletePress = () => {
        console.log("delete pressed")
    }

    const onReportPress = () => {
        console.log("report pressed")
        setShowChatActionsModal(false)

    }


    const onCopyPress = () => {
        console.log("copy pressed")
        setShowChatActionsModal(false)


    }

    const onReplyPress = () => {
        console.log("Reply pressed")
        setShowChatActionsModal(false)
    }

    const onReactionPress = (reaction) => {
        console.log('reaction: ' + reaction)
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .doc(selectedChat.id)
            .update({
                reactions: firebase.firestore.FieldValue.arrayUnion({
                    reaction: reaction,
                    user: {
                        uid: auth.currentUser.uid,
                        displayName: auth.currentUser.displayName,
                        photoURL: auth.currentUser.photoURL
                    }
                })
            })
    }
    console.log(burningQuestion)
    const getSubtitle = () => {

        switch (chatOption) {
            case '🔥 Burning Question': return 'Send a Burning Question to get your problem noticed and recieve quick answers!'
            case '👍👎 Poll': return 'Create your own poll and send it to the chat.'
            case '🍪 Request Cookies': return 'Ask your classmates for Cookies!'
            case '🎮 New Game': return 'Start a new game in the chat!'
        }
    }
    const onChatOptionPress = () => {
        switch (chatOption) {
            case '🔥 Burning Question': props.navigation.navigate('NewBurningQuestion', { user: users[1], setBurningQuestion })
            case '👍👎 Poll':
            case '🍪 Request Cookies':
            case '🎮 New Game':
                setShowChatOptionModal(false);
        }
    }

    const renderBottomSheetContent = () => (
        <View style={{ backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background, height: '100%', paddingHorizontal: 20, justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={onChatOptionPress}
                activeOpacity={0.8}
                style={{ flexDirection: 'row', padding: 20, backgroundColor: Colors.accent, borderRadius: 15, justifyContent: 'space-between' }}>
                <Text style={{ color: Colors.white, fontFamily: 'KanitMedium', fontSize: 20, alignSelf: 'center' }}>{chatOption}</Text>
                <Image source={assets.right_arrow} style={{ tintColor: Colors.white, width: 28, height: 28 }} />
            </TouchableOpacity>
            <Text style={{ color: Colors[colorScheme].darkGray, fontFamily: "Kanit", marginVertical: 20, fontSize: 16 }}>{getSubtitle()}</Text>


        </View>

    )
    const renderBottomSheetHeader = () => (
        <View style={[styles.bottomSheetHeader, {
            backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background,
        }]}>

            <View style={{ height: 5, width: '20%', borderRadius: 25, backgroundColor: '#00000020', alignSelf: 'center' }} />
        </View>
    )
    return (

        <View style={{ flex: 1, backgroundColor: Colors.primary }}>

            <Header

                style={{ backgroundColor: Colors.primary, height: SIZES.header + 50 }}
                headerLeft={headerLeft()}
                headerRight={<CallButton />}


            />
            <CustomBottomSheet

                snapPoints={[300, -10]}
                show={showChatOptionModal}
                renderContent={renderBottomSheetContent}
                onClose={() => setShowChatOptionModal(false)}

            />



            {chatroom?.type === 'class' &&

                <View style={{ padding: 5, backgroundColor: Colors.accent, borderTopWidth: 2, borderColor: 'white' }}>
                    <Text style={{ color: 'white', fontFamily: 'Kanit', textAlign: 'right' }}>
                        {"Swipe left to see the classroom feed! 👉"}
                    </Text>

                </View>}

            <ChatModal
                visible={showChatActionsModal}
                onCancelPress={() => setShowChatActionsModal(false)}
                message={selectedChat}
                users={users}
                onDeletePress={onDeletePress}
                onCopyPress={onCopyPress}
                onReportPress={onReportPress}
                onReplyPress={onReplyPress}
                onReactionPress={onReactionPress}
                startValue={0}

            />






            <View style={{ flex: 1, borderRadius: 15, backgroundColor: Colors[colorScheme].background, zIndex: 1, overflow: 'hidden' }}>

                <FlatList
                    bounces
                    style={{ height: '100%' }}
                    data={chats}
                    onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
                    ref={setRef}
                    onScrollBeginDrag={() => {
                        //Keyboard.dismiss();
                        setShowTimestamp(true)

                    }}
                    keyboardDismissMode='interactive'
                    keyExtractor={item => item.id}
                    onScrollEndDrag={() => setTimeout(() => setShowTimestamp(false), 2000)}
                    renderItem={({ item, index }) =>
                        <View style={{ marginBottom: index === chats.length - 1 ? 30 : 0 }}>
                            <ChatMessage
                                chat={item}
                                onDeskItemPress={() => props.navigation.navigate("DeskItem", { deskItem: item.deskItem, deskType: item.contentType })}
                                onLongPress={() => { setSelectedChat(item); setShowChatActionsModal(true) }}
                                previousChat={chats[index - 1]}
                                showsTime={showTimestamp}
                                index={index}
                                onProfileButtonPress={() => props.navigation.navigate('Profile', { uid: item.user.uid })}

                            />
                        </View>
                    }
                />





                <ChatInput

                    onCameraPress={() => { }}
                    onSendPress={onSendPress}
                    message={message}
                    content={burningQuestion && <BurningQuestion burningQuestion={burningQuestion} />}
                    deskItem={deskItem}
                    onChangeMessage={setMessage}
                    onDeskPress={() => props.navigation.navigate('SelectDeskItem', { onSelect: onDeskItemSendPress })}
                    onChatOptionPress={(emoji, option) => {
                        Keyboard.dismiss();
                        setShowChatOptionModal(true)
                        setChatOption(emoji + " " + option)
                    }}
                />



            </View>





            {/* 
                    {chats?.length ?
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {moment(chats[0]?.data?.createdAt?.toDate()).calendar()}
                        </Text>
                        :
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {'Today'}
                        </Text>} */}



        </View >

    )
}






const styles = StyleSheet.create({


    icon: {
        tintColor:
            Colors.light.tint,
        width: 30,
        height: 30

    },
    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    className: {
        fontSize: 20,
        fontWeight: '600',

    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },
    bottomSheetHeader: {
        borderTopLeftRadius: 20,
        padding: 20,
        borderTopRightRadius: 20,

    }
})

export default Chatroom