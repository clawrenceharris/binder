import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../constants/index';
import { SHADOWS, SIZES } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { auth, db, updateCollection } from '../Firebase/firebase';
import { ChatListItem, ProfileButton } from '../components';
import Header from '../components/Header';
import firebase from 'firebase/compat';
import OptionsModal from '../components/OptionsModal';
import * as Haptics from 'expo-haptics'
import useColorScheme from '../hooks/useColorScheme';
import { haptics } from '../utils';
import CircleButton from '../components/CircleButton';
import { ActivityBadge } from '../components/ProfileBadges';
import Button from '../components/Button';
import { mainContainerStyle } from '../GlobalStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserChatrooms } from '../redux/actions';
import DropDownNotification from '../components/DropDownNotification';

const Chat = (props) => {
    const [showChatModal, setShowChatModal] = useState(false)
    const colorScheme = useColorScheme()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedChatroom, setSelectedChatroom] = useState(null)
    const { school, chatrooms } = props


    const deleteChat = () => {
        updateCollection('users', auth.currentUser.uid, { chatrooms: firebase.firestore.FieldValue.arrayRemove(db.collection('chatrooms').doc(selectedChatroom.id)) });

    }


    const onDeletePress = () => {

        setShowChatModal(false);
        setShowConfirmationModal(true);

    }

    useEffect(() => {




    }, [])


    const onPinPress = () => {

    }
    const onMutePress = () => {
        console.log("mute pressed")

    }

    const onNewChatPress = () => {
        console.log("new chat pressed")

    }


    const onManageChatsPress = () => {
        console.log("manage chats pressed")

    }

    const onLeavePress = () => {
        console.log("leave pressed")

    }
    const onBlockPress = () => {
        console.log("block pressed")
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'black' }} >


            <OptionsModal
                showModal={showChatModal}
                toValue={-350}
                options={selectedChatroom?.type === 'private' ? ['Pin', 'Mute', 'Delete', 'Block'] : ['Pin', 'Mute', 'Delete', 'Leave Group']}
                onOptionPress={selectedChatroom?.type === 'private' ? [onPinPress, onMutePress, onDeletePress, onBlockPress] : [onPinPress, onMutePress, onDeletePress, onLeavePress]}
                onCancelPress={() => setShowChatModal(false)}

            />


            {/* <ConfirmationModal
                showModal={showConfirmationModal}
                message='This will delete the converstation from your chat list. Chats and attachments sent will still be saved.'
                onConfirmPress={() => { deleteChat(); setShowConfirmationModal(false) }}
                onCancelPress={() => setShowConfirmationModal(false)}
            /> */}



            <View style={[{ ...mainContainerStyle }, { backgroundColor: colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background }]}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={school?.logo ? school.logo : assets.grad_cap} style={{ width: 20, height: 20, tintColor: 'gray' }} />
                    <Text style={{ margin: 10, fontFamily: 'Kanit', fontSize: 16, color: 'gray' }}>{school?.name}</Text>
                </View>
                <View style={{ height: '100%' }}>


                    {chatrooms?.length > 0 ?
                        <FlatList

                            data={chatrooms}
                            renderItem={({ item }) =>

                                <ChatListItem

                                    chatroom={item}
                                    onPress={() => {

                                        props.navigation.navigate('Chatroom', { id: item.id, name: item.name })
                                    }}
                                    onLongPress={() => {
                                        haptics('light');
                                        setShowChatModal(true);
                                        setSelectedChatroom(item);

                                    }}
                                    onProfileButtonPress={() => {
                                        if (item.type === 'private') {

                                            props.navigation.navigate('Profile', { uid: item.users[1].id })


                                        }
                                        else {
                                            props.navigation.navigate('GroupProfile', { id: item.id })
                                        }
                                    }}

                                />


                            }
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}

                        />
                        :

                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', height: '75%' }}>

                            <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`This is where all your chats with ${school?.name} students will appear.`}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`Tap   `}</Text>

                                <Image source={assets.add} style={{ width: 15, height: 15, tintColor: Colors.accent }} />
                                <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{` to start chatting! `}</Text>

                            </View>
                        </View>

                    }

                </View>

            </View>
            <Button
                onPress={() => { props.navigation.navigate('NewChat') }}
                style={{ paddingHorizontal: 0, borderRadius: 50, position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
            />

        </View >


    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserChatrooms }, dispatch)
const mapStateToProps = (store) => ({
    chatrooms: store.userState.chatrooms,
    school: store.schoolState.school
})

export default connect(mapStateToProps, mapDispatchProps)(Chat)