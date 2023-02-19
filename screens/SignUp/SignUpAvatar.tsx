import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '.'
import { assets, Colors } from '../../constants'
import { getErrorMessage, getItemLayout, openMediaLibrary } from '../../utils'
import { useRoute } from '@react-navigation/native'
import { AddUserToSchool, auth, db, updateCollection, updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'
import OptionsModal from '../../components/OptionsModal'
import Header from '../../components/Header'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import useColorScheme from '../../hooks/useColorScheme'
import CustomImage from '../../components/CustomImage'
import AvatarPicker from '../../components/AvatarPicker'
import Swiper from 'react-native-swiper'
import avatars from '../../constants/avatars'
import { ProfileButton } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRanks } from '../../redux/actions'

//TODO: need to implement uploading picture using camera
const SignUpAvatar = (props) => {
    const [avatar, setAvatar] = useState(null)
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const { displayName, birthday, school, email, password, username } = props.route.params
    const colorScheme = useColorScheme()

    const { ranks } = props
    useEffect(() => {
        props.fetchRanks()


    }, [])

    const signUpUser = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user.uid)
                db.collection('users')
                    .doc(user.uid)
                    .set({
                        uid: user.uid,
                        username,
                        displayName,
                        avatar,
                        birthday,
                        email,
                        school,
                        friends: [],
                        rank: ranks[0].name,
                        cookies: 0,
                        classes: [],
                        studyBuddies: []

                    })
                    .then(() => {
                        AddUserToSchool(school)

                    })
                    .catch(e => getErrorMessage(e.message))
            })
            .catch(e => getErrorMessage(e.message))

    }

    const onFinishedPressed = () => {
        signUpUser()



    }

    const onSkipPressed = () => {
        setAvatar(null)
        signUpUser()

    }



    return (
        <>
            <AvatarPicker

                show={showAvatarModal}
                onSubmit={(avatar) => { setAvatar(avatar); setShowAvatarModal(false) }}
                onClose={() => setShowAvatarModal(false)} />

            <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>

                <Header navigation={props.navigation} />

                <View style={{ padding: 20, alignItems: 'center' }}>

                    <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"You're Almost Done!"}</Text>
                    <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{"Personalize your profile even further by choosing an avatar!"}</Text>



                    <View style={{ width: 150, height: 150, borderRadius: 100 }}>


                        {!avatar ?
                            <Swiper horizontal={false} autoplay showsPagination={false} height={160} autoplayTimeout={1.5} scrollEnabled={false}>
                                {avatars.sort(() => Math.random() - 0.5).map(avatar => (
                                    <ProfileButton imageURL={avatar} size={150} onPress={() => setShowAvatarModal(true)} />

                                ))}


                            </Swiper>
                            :
                            <ProfileButton imageURL={avatar} size={150} onPress={() => setShowAvatarModal(true)} />

                        }
                        <TouchableWithoutFeedback onPress={() => setShowAvatarModal(true)}>

                            <View


                                style={{ backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background, borderRadius: 100, padding: 8, position: 'absolute', bottom: -15, right: -10 }}>


                                <View

                                    style={{ width: 45, height: 45, borderRadius: 100, padding: 8, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image source={assets.add} style={{ width: 30, height: 30, tintColor: 'white' }} />

                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>


                </View>



                <Button
                    title={!avatar ? 'Finish' : 'Finish 😎'}
                    onPress={onFinishedPressed}
                    style={{ margin: 20 }}
                    disabled={!avatar}
                />


                <TouchableWithoutFeedback onPress={onSkipPressed}>
                    <Text style={{ fontFamily: 'KanitSemiBold', color: Colors[colorScheme].darkGray, alignSelf: 'center', fontSize: 16 }}>{"Skip"}</Text>
                </TouchableWithoutFeedback>
                <View>
                </View>
            </View>
        </>

    )
}
const mapStateToProps = store => ({
    ranks: store.ranksState.ranks
})
const mapDispatchProps = dispatch => bindActionCreators({ fetchRanks }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(SignUpAvatar)