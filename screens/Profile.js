import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Platform, ImageBackground, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { ProfileButton } from '../components'
import { SHADOWS, SIZES } from '../constants/Theme'
import moment from 'moment'
import { auth, db, updateCollection, updateUserProfile } from '../Firebase/firebase'
import { getItemLayout, getZodiacSign, openMediaLibrary } from '../utils'
import EditNameModal from '../components/EditNameModal'
import OptionsModal from '../components/OptionsModal'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import ModalComponent from '../components/Modal'
import { headerButton, mainContainerStyle } from '../GlobalStyles'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserStudyBuddies } from '../redux/actions'
import { TwelvePointBurst } from '../components/shapes'
import Header from '../components/Header'
import ClassSchoolListItem from '../components/ClassSchoolListItem'
import { StudyBuddyBadge } from '../components/ProfileBadges'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view'
import BackButton from '../components/BackButton'
import firebase from 'firebase/compat'
import { SubmitModal } from '../components/Modals'
import DropDownNotification from '../components/DropDownNotification'
import { StatusBar } from 'expo-status-bar'
import AvatarPicker from '../components/AvatarPicker'
const MAX_HEIGHT = 560
const MIN_HEIGHT = Platform.OS === 'ios' ? 0 : 55
const Profile = (props) => {
    const isCurrentUser = () => {
        return props.route.params.uid === auth.currentUser.uid
    }
    const [user, setUser] = useState(null)
    const { currentUser, classes, studyBuddies } = props
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)
    const [showAvatarPicker, setShowAvatarPicker] = useState(false)
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)

    const [showEditNameModal, setShowEditNameModal] = useState(false)
    const colorScheme = useColorScheme()
    const zodiacEmoji = getZodiacSign(user?.birthday?.toDate().getDate(), user?.birthday?.toDate().getMonth(), true);
    const zodiacSign = getZodiacSign(user?.birthday?.toDate().getDate(), user?.birthday?.toDate().getMonth(), false)
    const birthday = moment(user?.birthday?.toDate()).format("MMM DD, YYYY")
    const [otherUserStudyBuddies, setOtherUserStudyBuddies] = useState([])
    const [otherUserClasses, setOtherUserClasses] = useState([])
    const [name, setName] = useState(user?.displayName)
    const [loading, setLoading] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [showFriendNotification, setShowFriendNotification] = useState(false)
    const getSubtitle = (message, data, isPossesive, isExclaimatory) => {
        let subtitle = ''
        let pronoun = ''
        const punctuation = isExclaimatory ? "!" : "."

        if (isCurrentUser()) {
            pronoun = isPossesive ? "Your" : "You"
            subtitle = pronoun + " " + message + " " + data + punctuation

        }
        else {
            if (user?.displayName) {
                pronoun = isPossesive ? user?.displayName + "'s" : user?.displayName
            }
            else {
                pronoun = isPossesive ? "Their" : "They"
            }

            subtitle = pronoun + " " + message + " " + data + punctuation
        }


        return subtitle
    }

    const data = [
        {
            id: '0',
            emoji: "🏫",
            title: "School",
            subtitle: getSubtitle("go to", user?.school?.name, false, false),
            data: user?.school?.name


        },
        {
            id: '1',
            emoji: "🎓",
            title: "Graduating Class",
            subtitle: getSubtitle("graduate in", user?.gradYear, false, false),
            data: user?.gradYear

        },
        {
            id: '2',
            emoji: "💯",
            title: "GPA",
            data: user?.gpa,
            subtitle: getSubtitle("gpa is", user?.gpa, true, false),

        },
        {
            id: '3',
            emoji: "🎂",
            title: "Birthday",
            subtitle: getSubtitle("birthday is on", birthday, true, true),
            data: moment(user?.birthday?.toDate()).format("MMM DD, YYYY")

        },
        {
            id: '4',
            emoji: zodiacEmoji,
            title: "Astrology",
            subtitle: getSubtitle(isCurrentUser() ? "are a" : "is a", zodiacSign, false, true),
            data: zodiacSign

        },
    ]



    useEffect(() => {

        if (isCurrentUser()) {
            props.fetchUser()

            setUser(currentUser) // set the user to this current user


        }
        else {
            db.collection('users')
                .doc(props.route.params.uid)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        const user = doc.data()
                        setUser(user)
                    } else {
                        console.log('user does not exist')
                    }
                })
        }
        if (props.friends.indexOf(props.route.params.uid) > -1) {
            setIsFriend(true)
        }
        else {
            setIsFriend(false)
        }
    }, [props.route.params.uid, props.friends, props.currentUser.photoURL])


    const onSubmitName = () => {
        setLoading(true)

        if (name) {
            db.collection('users')
                .doc(auth.currentUser.uid)
                .update({
                    displayName: name
                }).then(() => {
                    setLoading(false);

                    setShowEditNameModal(false);
                })
        }

    }

    const profileItemModal = (emoji, title, subtitle,) => (
        <View style={{ alignItems: 'center' }}>
            <View style={[styles.emojiContainer, { ...SHADOWS[colorScheme], backgroundColor: Colors[colorScheme].gray, borderColor: Colors[colorScheme].darkGray }]}>

                <Text style={{ fontSize: 36 }}>{emoji}</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: Colors[colorScheme].tint }}>{title}</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>{subtitle}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: Colors[colorScheme].gray, borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.accent, fontFamily: 'KanitMedium', fontSize: 20 }}>{"Close"}</Text>
            </TouchableOpacity>
        </View>



    );

    const onAddFriendPress = () => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({ friends: firebase.firestore.FieldValue.arrayUnion(user.uid) })
            .then(() => {
                setShowFriendNotification(true)
            })
    }

    const onUnaddFriendPress = () => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({ friends: firebase.firestore.FieldValue.arrayRemove(user.uid) })
            .then(() => {
                setShowFriendNotification(true)
            })
    }

    const onChatPress = () => {
        const id = auth.currentUser.uid + "-" + user.uid
        const docRef = db.collection('chatrooms').doc(id);

        docRef.get().then(doc => {
            docRef.set({
                type: 'private',
                users: [db.collection('users').doc(auth.currentUser.uid), db.collection('users').doc(user.uid)]

            })

        })
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({
                chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef)
            }).then(() =>
                props.navigation.navigate('Chatroom', { id, name: user.displayName })

            )
    }

    const onDeskPress = () => {
        props.navigation.navigate('Desk', { uid: user.uid })
    }
    const onLibraryPress = async () => {
        const result = await openMediaLibrary('photo', 1);
        if (result) {
            updateCollection('users', auth.currentUser.uid, { photoURL: result });
        }
    }

    const onTakePicturePress = () => {
        props.navigation.navigate('Camera', { canRecord: false })
    }

    if (user === null) {
        return <View />
    }

    const onProfileButtonPress = () => {
        if (isCurrentUser())
            setShowAvatarPicker(true)
    }
    const headerRight = () => (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('Settings')}
            style={[{ ...headerButton, backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint }]}>

            <Image source={assets.settings} style={{ width: 22, height: 22, tintColor: Colors[colorScheme].veryDarkGray }} />
        </TouchableOpacity>

    )
    const headerLeft = () => (
        <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[{ ...headerButton, backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint }]}>

            <Image source={assets.left_arrow} style={{ width: 22, height: 22, tintColor: Colors[colorScheme].veryDarkGray }} />
        </TouchableOpacity>

    )
    return (
        <>

            <AvatarPicker
                show={showAvatarPicker}
                onClose={() => setShowAvatarPicker(false)}
                onSubmit={(result) => {
                    setShowAvatarPicker(false)
                    updateCollection('users', auth.currentUser.uid, { photoURL: result })
                }
                } />




            <View style={{ flex: 1 }} >


                <Modal
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    onBackdropPress={() => setShowEditNameModal(false)}
                    backdropOpacity={0.3}
                    isVisible={showEditNameModal}


                >






                </Modal>




                <Header
                    navigation={props.navigation}
                    headerRight={isCurrentUser() && headerRight()}
                    headerLeft={headerLeft()}
                    style={{ position: 'absolute' }}
                />



                <DropDownNotification
                    showNotification={showFriendNotification}
                    style={{ backgroundColor: Colors.accent, borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'Kanit', color: Colors.white, alignSelf: 'center' }}>{user.displayName + " was added as a friend!"}</Text>
                </DropDownNotification>
                <ImageHeaderScrollView
                    showsVerticalScrollIndicator={false}
                    overlayColor={'#000000'}
                    maxOverlayOpacity={0.8}
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    renderHeader={() =>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Image source={assets.add_image} style={{ width: 100, height: 100, tintColor: Colors.light.gray }} />

                        </View>
                    }



                    contentContainerStyle={{ borderRadius: 25, backgroundColor: colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background }}
                    style={{ marginTop: -10 }}
                >


                    <TriggeringView style={{ paddingHorizontal: 20, height: '200%' }}>

                        <View style={[styles.friendsCookiesContainer, {
                            backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint,
                            ...SHADOWS[colorScheme]
                        }]}>

                            <TouchableWithoutFeedback>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{user?.cookies}</Text>
                                    <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Cookies"}</Text>

                                </View>
                            </TouchableWithoutFeedback>


                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Friends')}>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{user?.friends.length}</Text>
                                    <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Friends"}</Text>

                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{user?.coins || 0}</Text>
                                    <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Coins"}</Text>

                                </View>
                            </TouchableWithoutFeedback>

                        </View>





                        <View style={[styles.profileHeaderContentContainer,
                        {
                            backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint,
                            ...SHADOWS[colorScheme]
                        }]}>





                            <View style={styles.profileImageContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TwelvePointBurst
                                        style={{ position: 'absolute', top: 2, left: -5 }}
                                        color={colorScheme === 'light' ? '#D5DFE380' : '#00000070'}
                                        size={80} />

                                    <TwelvePointBurst
                                        color={'#793BB9'}

                                        style={{ ...SHADOWS[colorScheme], shadowColor: '#00000060' }}
                                    >

                                        <TwelvePointBurst
                                            color={Colors.primary}
                                            size={75}
                                            style={{ position: 'absolute', left: 1 }}>

                                            <ProfileButton
                                                onPress={onProfileButtonPress}
                                                size={80}
                                                defaultImage={assets.person}
                                                containerStyle={{ position: 'absolute', bottom: -3 }}
                                                imageContainerStyle={{ borderWidth: 2, borderColor: Colors.white }}
                                                imageURL={user.photoURL}

                                            />

                                        </TwelvePointBurst>
                                    </TwelvePointBurst>

                                    <View>


                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>

                                            <Image source={assets.rank} style={{ width: 20, height: 20, tintColor: Colors.primary }} />


                                            <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: Colors.primary, marginLeft: 5 }}>{user.rank}</Text>
                                        </View>

                                        <View style={styles.nameBioContainer}>



                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => isCurrentUser() && setShowEditNameModal(true)}
                                                style={{ alignItems: 'center', flexDirection: 'row', width: '90%' }}>

                                                <Text
                                                    numberOfLines={1}

                                                    style={{ fontSize: 24, fontFamily: 'KanitMedium', color: user.displayName ? Colors[colorScheme].tint : '#00000080', maxWidth: '90%' }}>

                                                    {user.displayName || 'Display Name'}
                                                </Text>


                                                {isCurrentUser() &&
                                                    <Image
                                                        source={assets.pencil}
                                                        style={{ width: 15, height: 15, tintColor: Colors[colorScheme].tint, marginLeft: 10 }}
                                                    />
                                                }

                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </View>


                            {!isCurrentUser() &&

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 30, justifyContent: 'space-between' }}>


                                    {!currentUser.friends.includes(user.uid) ? (
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={onAddFriendPress}
                                                activeOpacity={1}
                                                style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme].lightGray, borderRadius: 16 }}>



                                                <Image source={assets.person} style={{ width: 28, height: 28, tintColor: Colors[colorScheme].veryDarkGray }} />
                                                <Image source={assets.add} style={{ position: 'absolute', top: 20, left: 10, width: 10, height: 10, tintColor: Colors[colorScheme].veryDarkGray }} />





                                            </TouchableOpacity>

                                            <Text style={{ color: Colors[colorScheme].veryDarkGray, fontFamily: 'Kanit' }}>{"Add"}</Text>
                                        </View>

                                    ) :
                                        (
                                            <View style={{ alignItems: 'center' }}>

                                                <TouchableOpacity
                                                    onPress={onUnaddFriendPress}
                                                    activeOpacity={1}
                                                    style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'light' ? Colors.light.gray : '#292929', borderRadius: 16 }}                                            >


                                                    <Image source={assets.person} style={{ width: 28, height: 28, tintColor: Colors.accent }} />
                                                    <Image source={assets.check} style={{ position: 'absolute', top: 20, left: 10, width: 10, height: 10, tintColor: Colors.accent }} />



                                                </TouchableOpacity>
                                                <Text style={{ color: Colors.accent, fontFamily: 'Kanit' }}>{"Added!"}</Text>

                                            </View>
                                        )

                                    }
                                    <View style={{ alignItems: 'center' }}>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={onChatPress}
                                            style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'light' ? Colors.light.gray : '#292929', borderRadius: 16 }}                                            >

                                            <Image source={assets.send} style={{ width: 25, height: 25, tintColor: Colors[colorScheme].veryDarkGray }} />

                                        </TouchableOpacity>
                                        <Text style={{ color: Colors[colorScheme].veryDarkGray, fontFamily: 'Kanit' }}>{"Chat"}</Text>

                                    </View>


                                    <View style={{ alignItems: 'center' }}>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={onDeskPress}
                                            style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'light' ? Colors.light.gray : '#292929', borderRadius: 16 }}                                            >

                                            <Image source={assets.desk} style={{ width: 25, height: 25, tintColor: Colors[colorScheme].veryDarkGray }} />

                                        </TouchableOpacity>
                                        <Text style={{ color: Colors[colorScheme].veryDarkGray, fontFamily: 'Kanit' }}>{"View Desk"}</Text>

                                    </View>

                                    <View style={{ alignItems: 'center' }}>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={onChatPress}
                                            style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'light' ? Colors.light.gray : '#292929', borderRadius: 16 }}                                            >

                                            <Image source={assets.more} style={{ width: 25, height: 25, tintColor: Colors[colorScheme].veryDarkGray }} />

                                        </TouchableOpacity>
                                        <Text style={{ color: Colors[colorScheme].veryDarkGray, fontFamily: 'Kanit' }}>{"Options"}</Text>

                                    </View>


                                </View>}

                        </View>





                        <View>

                            <FlatList
                                data={data}
                                style={{ marginTop: 20 }}
                                horizontal

                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) =>
                                    item.data &&
                                    <TouchableOpacity
                                        onPress={() => { setModal(profileItemModal(item.emoji, item.title, item.subtitle)); setShowModal(true); }}
                                        style={[styles.profileItemContainer, { backgroundColor: '#D5DFE330' }]}>
                                        <Text style={{ fontFamily: 'KanitLight', color: Colors.dark.lightGray, textAlign: 'center', fontSize: 18 }}>{item.emoji + " " + item.data}</Text>

                                    </TouchableOpacity>
                                }
                            />
                        </View>





                        {!isCurrentUser() &&
                            <View>


                                <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].darkGray, marginTop: 20, fontSize: 18 }}>
                                    {"Shared Classes"}

                                </Text>
                                <ScrollView
                                    horizontal
                                    style={{ borderRadius: 15, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }} >
                                    {classes.map((item) => (
                                        otherUserClasses.includes(item.id) &&
                                        <ClassSchoolListItem
                                            item={item}
                                            onPress={() => { }}
                                            type={'class'}


                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        }


                        <View style={{ height: 100 }} />

                    </TriggeringView>
                </ImageHeaderScrollView>
            </View >

        </>

    )
}


const styles = StyleSheet.create({

    nameBioContainer: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'flex-start',
        marginLeft: 30


    },
    profileImageContainer: {
        alignItems: 'center',

    },
    friendsCookiesContainer: {
        width: '100%',
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15
    },
    profileHeaderContentContainer: {
        marginTop: 30,
        borderRadius: 15,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',

    },
    emojiContainer: {
        backgroundColor: '#00000020',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00000030',

    },
    profileItemContainer: {
        borderColor: Colors.light.gray,
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 10,
        padding: 6,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center'

    },

    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    sectionTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 18,
        marginTop: 30

    },

    className: {
        fontSize: 20,
        fontFamily: 'KanitBold'


    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },

    number: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 5
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    classes: store.userState.classes,
    studyBuddies: store.userState.studyBuddies,
    friends: store.userState.friends,
    rank: store.userState.rank
})


const mapDispatchProps = (dispatch) =>
    bindActionCreators({

        fetchUser
    }, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Profile)