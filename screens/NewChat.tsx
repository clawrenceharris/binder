import { View, Text, ScrollView, TextInput, StyleSheet, Image, FlatList, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { auth, db, getData } from '../Firebase/firebase'
import UserListItem from '../components/UserListItem'
import FilterTag from '../components/FilterTag'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import Button from '../components/Button'
import firebase from 'firebase/compat'
import useColorScheme from '../hooks/useColorScheme'
import Input from '../components/StyledTextInput'
import { connect } from 'react-redux'
import SearchSelect from './SearchSelect'
import DropDownNotification from '../components/DropDownNotification'
const NewChat = (props) => {

    const [filters, setFilters] = useState([])
    const [groupName, setGroupName] = useState('')
    const [selectedClass, setSelectedClass] = useState(null)
    const colorScheme = useColorScheme()
    const [loading, setLoading] = useState(true)

    const { currentUser, classes, school, users } = props
    const [results, setResults] = useState(users)

    const [showErrorNotification, setShowErrorNotification] = useState(false)


    LogBox.ignoreAllLogs()


    const handleNewChat = (users) => {
        const defaultName = users.map(item => item.displayName).join(", ")

        users.push(currentUser)

        const id = users.map(user => user.uid).join("-")
        console.log('users', users)
        console.log('id', id)

        db.collection('chatrooms')
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log("DOC DOES NOT EXIST YET")
                    db.collection('chatrooms')
                        .doc(id)
                        .set({
                            type: users.length > 2 ? 'group' : 'private',
                            users: users.map((user) => user.uid),
                            name: users.length > 2 && groupName || defaultName
                        }).catch(e => {
                            setShowErrorNotification(true)
                            console.log(e.message)


                        })



                    db.collection('chatrooms')
                        .doc(auth.currentUser.uid)
                        .collection('userChatrooms')
                        .doc(id)
                        .set({})
                        .catch(e => {
                            setShowErrorNotification(true)
                            console.log(e.message)

                        })

                }


            })

        props.navigation.goBack()
        props.navigation.navigate('Chatroom', {
            id: id,

            name: users.length > 2 ? groupName || defaultName : users[0].displayName

        })

    }

    const handleSearch = (search) => {
        db.collection('users')
            .where('displayName', '>=', search)
            //.where('school', '==', db.collection('schools').doc(currentUser.school.id))
            .get()
            .then((query) => {
                let users = query.docs.map((doc) => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data }
                })
                setResults(users)
            })





    }

    const filter = (item) => {
        if (item === selectedClass) {
            setSelectedClass(null)
            setResults(users.filter(user => user.uid !== auth.currentUser.uid))
        }
        else {
            setSelectedClass(item)
            const filteredData = users.filter((user) => {
                for (let i = 0; i < user.classes.length; i++) {
                    return user.classes[i].id === item.id


                }
            })
            console.log(filteredData.length)

            setResults(filteredData)

        }



    }

    const isFilterSelected = (item) => {

        return item === selectedClass
    }


    return (

        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
            <DropDownNotification
                showNotification={showErrorNotification}
                style={{ backgroundColor: Colors.accent, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'Kanit', color: Colors.white, alignSelf: 'center' }}>{"Something went wrong. Please try again later."}</Text>
            </DropDownNotification>
            <SearchSelect
                navigation={props.navigation}
                title={'New Chat'}
                placeholder={'Find classmates'}
                collectionPath={'users'}
                selectionLimit={10}
                data={users.filter(user => user.uid !== auth.currentUser.uid)}
                update={handleNewChat}
                buttonTitle={(selected) => selected.length <= 1 ? 'Chat' : 'Group Chat'}
                renderFilters={() =>

                    <ScrollView

                        horizontal
                        showsHorizontalScrollIndicator={false}>

                        {school && <FilterTag

                            data={school.name}
                            isSelected
                            onPress={() => { }}
                        />}


                        {classes.map((item, index) =>
                            <FilterTag
                                key={index.toString()}
                                onPress={() => { filter(item) }}
                                data={item.name}
                                isSelected={isFilterSelected(item)}

                            />

                        )}

                    </ScrollView>
                }
            />



        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: 'white',
        backgroundColor: '#00000010',
        borderRadius: 15
    },

})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    classes: store.userState.classes,
    school: store.schoolState.school,
    users: store.usersState.users

})

export default connect(mapStateToProps, null)(NewChat)