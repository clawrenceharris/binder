import { View, Text, FlatList, Image, LogBox, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import { SHADOWS } from '../constants/Theme';
import { auth, db } from '../Firebase/firebase';
import { ProfileButton } from '../components';
import firebase from 'firebase/compat';
import OptionsModal from '../components/OptionsModal';
import Button from '../components/Button';
import { haptics } from '../utils';
import CircleButton from '../components/CircleButton';
import { ActivityBadge } from '../components/ProfileBadges';
import { mainContainerStyle } from '../GlobalStyles';
import { connect } from 'react-redux';
import ClassSchoolListItem from '../components/ClassSchoolListItem';
import { bindActionCreators } from 'redux';
import { fetchSchoolClasses, fetchUserClasses } from '../redux/actions';

import { ConfirmationModal } from '../components/Modals';
import ScaleButton from '../components/ScaleButton';
import BottomSheetModal from '../components/BottomSheetModal';
import SpringModal from '../components/SpringModal';
import OptionsList from '../components/OptionsList';
import SlideModal from '../components/SlideModal';

const Classes = (props) => {


    const colorScheme = useColorScheme();
    const [showClassModal, setShowClassModal] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const [loading, setLoading] = useState(false)

    const { classes, schoolClasses, school } = props



    const enterClassroom = (name, id) => {
        db.collection('chatrooms')
            .doc(id)
            .set({
                type: 'class',
                name: name

            }, { merge: true })
        db.collection('chatrooms')
            .doc(id)
            .update({
                users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid)),

            })

        props.navigation.navigate('Classroom', {
            id: id,
            name: name

        })

    }

    const updateClasses = (classes) => {

        classes.forEach((item) => {
            db.collection('users')
                .doc(auth.currentUser.uid)

                .update({
                    classes: firebase.firestore.FieldValue.arrayUnion(item.id)
                })
        })
        classes.forEach((item) => {
            db.collection('school')
                .doc(school.id)
                .collection('classes')
                .doc(item.id)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.id)
                })
        })
    }

    const deleteClass = () => {

        db.collection('schools').doc(school.id).collection('classes').doc(selectedClass.id)
            .update({
                users: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid)
            }).then(() => {
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({
                        classes: firebase.firestore.FieldValue.arrayRemove(selectedClass.id)
                    })


            })




    }

    const routeParams = {
        data: schoolClasses,
        placeholder: 'Find classes',
        title: 'Add Classes',
        collectionPath: 'classes',
        update: updateClasses,
        selectionLimit: 10
    }





    const onLeaveClassPress = () => {

        setShowClassModal(false);
        setTimeout(() => setShowConfirmationModal(true), 500)

    }

    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {

            }}
            badgeContainerStyle={{ backgroundColor: Colors.primary, top: '55%', left: '65%' }}
            badge={ActivityBadge()}
            showsName={true}


        />

    )

    const headerRight = () => (

        <CircleButton
            onPress={() => { }}
            style={{ marginLeft: 10 }}
            source={assets.more}
        />

    )

    useEffect(() => {






    }, [])



    return (





        <>




            <View style={{ ...mainContainerStyle, backgroundColor: Colors[colorScheme].background, padding: 0 }}>



                <SlideModal showModal={showConfirmationModal} onCancel={() => setShowConfirmationModal(false)}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>


                        <TouchableWithoutFeedback>
                            <View
                                style={{ padding: 20, backgroundColor: Colors[colorScheme].background, width: '83%', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }} >


                                <ConfirmationModal
                                    message={`Leaving ${selectedClass?.name?.split(' ').map((text) => '##' + text + " ")}means you won't be able to see their feed or chats anymore.`}
                                    onConfirmPress={() => {
                                        setShowConfirmationModal(false);
                                        deleteClass();
                                    }}
                                    onCancelPress={() => setShowConfirmationModal(false)}

                                />
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </SlideModal>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={school?.logo ? school.logo : assets.grad_cap} style={{ width: 20, height: 20, tintColor: 'gray' }} />
                    <Text style={{ margin: 10, fontFamily: 'Kanit', fontSize: 16, color: 'gray' }}>{school?.name}</Text>
                </View>

                {classes.length > 0 && <View style={{ height: '100%' }}>

                    <FlatList
                        data={classes}
                        keyExtractor={item => item?.id}
                        renderItem={({ item }) =>





                            <View style={{ ...SHADOWS[colorScheme], shadowColor: '#00000040', marginTop: 10 }}>

                                <ClassSchoolListItem
                                    onPress={() => console.log("Pressed")}
                                    item={item}
                                    type={'class'}
                                    style={{ width: '90%' }}
                                    onProfileButtonPress={() => props.navigation.navigate('ClassSchoolProfile', { id: item.id })}
                                    users={[]}
                                    activity={[]}
                                    onLongPress={() => { setSelectedClass(item); setShowClassModal(true) }}
                                />
                            </View>



                        }

                    />
                </View>}
                {school && classes.length === 0 && <View style={{ padding: 30, alignItems: 'center', justifyContent: 'center', height: '100%' }}>


                    <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`Your classes for ${school?.name} will appear here.`}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`Tap   `}</Text>

                        <Image source={assets.add} style={{ width: 15, height: 15, tintColor: Colors.accent }} />

                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{` to start adding classes! `}</Text>

                    </View>



                </View>}

                {!school && <View style={{ marginTop: 30, alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center', }}>{'Oops! \nYou are not in a school yet.'}</Text>
                    <Button
                        background={'white'}
                        title={'Join a School'}
                        tint={'black'}
                        onPress={() => props.navigation.navigate('SchoolSettings', { school: null })}
                    />

                </View>}



                <Button
                    onPress={() => props.navigation.navigate('SearchSelect', { ...routeParams })}
                    style={{ paddingHorizontal: 0, borderRadius: 50, position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                    icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
                />
            </View>

            <SlideModal
                showModal={showClassModal}
                onCancel={() => setShowClassModal(false)}
                toValue={Dimensions.get('window').height - (2 * 120)}
            >
                <OptionsList
                    options={['Pin', 'Leave Class']}
                    onOptionPress={[() => { }, onLeaveClassPress]}





                />
            </SlideModal>






        </>


    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    school: store.schoolState.school,
    classes: store.userState.classes,
    schoolClasses: store.schoolState.classes
})

const mapDispatchProps = dispatch => bindActionCreators({ fetchUserClasses, fetchSchoolClasses }, dispatch)

export default connect(mapStateToProps, null)(Classes)