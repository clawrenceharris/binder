import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import { AddUserToSchool, auth, db, updateCollection } from '../../Firebase/firebase'
import Header from '../../components/Header'
import { faker } from '@faker-js/faker'
import firebase from 'firebase/compat'

import { ConfirmationModal } from '../../components/Modals'
const SchoolSettings = ({ navigation, route }) => {
    const [school, setSchool] = useState(route.params.school)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const routeParams = {
        update: setSchool,
        data: data,
        placeholder: 'Find schools',
        selectionLimit: 1,
        collectionPath: 'schools',
        title: 'Add School'
    }

    const onSavePress = () => {
        console.log("SCHOOL ID", school.id)
        setLoading(true)
        db.collection('schools').doc(school.id).update({
            users: firebase.firestore.FieldValue.arrayUnion(
                auth.currentUser.uid
            )

        }).then(() => {
            db.collection('users')
                .doc(auth.currentUser.uid)
                .update({
                    school: school.id,
                    classes: [],
                }).then(() => {
                    setLoading(false)
                    navigation.goBack()
                })


        })

    }
    useEffect(() => {
        const subscriber = db.collection('schools')

            .onSnapshot(querySnapshot => {
                const array = []

                querySnapshot.forEach(documentSnapshot => {

                    array.push(
                        {
                            id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        })

                })

                setData(array)

            })

        return () => {
            subscriber()
        }
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <ConfirmationModal
                message={`Saving this school means you will leave ${route.params.school?.name} and you won't be able to see their feed or chats anymore.`}
                onConfirmPress={() => {
                    setShowModal(false);
                    onSavePress();
                }}
                onCancelPress={() => setShowModal(false)}

            />
            <Header
                title='School'
                navigation={navigation}
                direction='horizontal'
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}

            />
            <View style={styles.mainContainer}>

                <Text style={styles.description}>{descriptions.school}</Text>

                <View style={{ marginTop: 30 }}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigation.navigate('SearchSelect', { ...routeParams }) }}
                        style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: '#00000070', borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={school ? assets.school : assets.pencil} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        {!school ?
                            <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{"Select a School"}</Text>
                            :
                            <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{school?.name}</Text>


                        }
                    </TouchableOpacity>
                </View>


                {school && school.id !== route.params?.school.id &&
                    <Button
                        style={{ margin: 30, width: '100%' }}
                        title={'Save'}
                        onPress={() => {
                            if (route.params.school != null)
                                setShowModal(true)
                            else
                                onSavePress()
                        }}
                        loading={loading}
                    />}
            </View>



        </View>
    )
}

export default SchoolSettings