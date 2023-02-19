import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Colors } from '../constants'
import { mainContainerStyle } from '../GlobalStyles'
import useColorScheme from '../hooks/useColorScheme'
import { connect } from 'react-redux'
import UserListItem from '../components/UserListItem'
import { auth, db } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import { bindActionCreators } from 'redux'
import { fetchUsersInSchool } from '../redux/actions'
const Suggested = (props) => {
    const colorScheme = useColorScheme()
    const { school, users } = props
    const [studyBuddies, setStudyBuddies] = useState([])

    const onAddStudyBuddyPress = (user) => {
        console.log("Added")
        setStudyBuddies([user, ...studyBuddies])
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({ studyBuddies: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(user.uid)) })
    }
    console.log(users.length)
    const onUnAddStudyBuddyPress = (user) => {
        console.log(studyBuddies.length)
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({ studyBuddies: firebase.firestore.FieldValue.arrayRemove(db.collection('users').doc(user.uid)) })
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, borderRadius: 15 }}>
            <Header
                navigation={props.navigation}
                title={"Suggested " + props.route.params.suggestedType}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}
                direction={'vertical'}
            />
            <View style={{ padding: 20, flex: 1 }}>


                <View style={{ backgroundColor: Colors[colorScheme].background, borderRadius: 25, overflow: 'hidden', height: '90%' }}>

                    <FlatList
                        keyExtractor={(item) => item.uid}
                        data={users.filter(user => user?.uid != auth.currentUser.uid)}
                        renderItem={({ item, index }) =>

                            <UserListItem

                                onPress={() => { props.navigation.push('Profile', { uid: item.uid }) }}
                                type={'add study buddy'}
                                user={item}
                                onSelect={() => {
                                    if (!studyBuddies.includes(item))
                                        onAddStudyBuddyPress(item)
                                    else {
                                        studyBuddies.pop()
                                        onUnAddStudyBuddyPress(item)
                                    }
                                }}
                                isSelected={studyBuddies.includes(item)}
                                isTop={index === 0}
                                isBottom={index === users.length - 1} />

                        }

                    />



                </View>

            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    school: store.schoolState.school,
    users: store.schoolState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersInSchool }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Suggested)