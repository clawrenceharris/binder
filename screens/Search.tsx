import { View, Text, StyleSheet, FlatList, Image, SectionList, ScrollView, TouchableWithoutFeedback, RefreshControl, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { assets, Colors } from '../constants'
import Header from '../components/Header'
import { connect } from 'react-redux'
import UserListItem from '../components/UserListItem'
import { SHADOWS } from '../constants/Theme'
import StyledTextInput from '../components/StyledTextInput'
import { ProfileButton } from '../components'
import { StudyBuddyBadge } from '../components/ProfileBadges'
import { getItemLayout } from '../utils'

const Search = (props) => {
    const colorScheme = useColorScheme()
    const [search, setSearch] = useState('')
    const { school, friends, users, classes, studyBuddies } = props
    const [userResults, setUserResults] = useState(users)
    const [studyBuddyResults, setStudyBuddyResults] = useState(studyBuddies)
    const [refreshing, setRefreshing] = useState(false)
    const searchItems = ['students', 'classmates', 'Study Buddies', 'Friends', 'Schools', ' Classes', 'Desks', 'Games', 'Notes', 'Flashcards']
    const [searchItemIndex, setSearchItemIndex] = useState(0)
    const clamp = (num, min, max) => {

    }
    useEffect(() => {
        if (searchItemIndex > searchItems.length) {
            setSearchItemIndex(0)
        }


        setTimeout(() => setSearchItemIndex(searchItemIndex + 1), 3000)


    }, [])
    const handleSearch = (search) => {
        setSearch(search)
        setUserResults(users.filter(user => user.displayName.toLowerCase().includes(search.toLowerCase().trim())))
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
            <Header
                title={'Search'}
                navigation={props.navigation}
                direction={'vertical'}
            />

            <View style={{ width: '100%' }}>

                <View style={{ padding: 20 }}>

                    <StyledTextInput
                        value={search}
                        onChangeText={handleSearch}
                        placeholder={'Search ' + searchItems[searchItemIndex]}
                        icon={<Image source={assets.search} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].veryDarkGray }} />}
                    />
                </View>
            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { }} />}
                style={{ ...SHADOWS[colorScheme], height: '100%', padding: 20 }}>
                {studyBuddyResults.length > 0 &&
                    <View>


                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, marginBottom: 10, marginTop: 30, color: Colors[colorScheme].tint }}>{"Study Buddies"}</Text>

                        <FlatList

                            data={studyBuddyResults}
                            getItemLayout={getItemLayout}
                            numColumns={2}
                            style={{ marginBottom: 30 }}
                            renderItem={({ item }) =>
                                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile', { uid: item.uid })}>
                                    <View
                                        style={{ padding: 10, maxWidth: '40%', alignItems: 'center', backgroundColor: Colors[colorScheme].invertedTint, borderRadius: 15 }}>

                                        <ProfileButton
                                            size={45}
                                            imageURL={item.photoURL}
                                            name={item.displayName}
                                            showsName
                                            nameStyle={{ fontFamily: 'Kanit' }}
                                            badge={StudyBuddyBadge(15)}
                                            badgeContainerStyle={{ top: '60%', left: '60%', backgroundColor: Colors[colorScheme].background }}
                                            onPress={() => props.navigation.navigate('Profile', { uid: item.uid })}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        />
                    </View>}
                {friends.length > 0 &&
                    <View>


                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, marginBottom: 10, marginTop: 30, color: Colors[colorScheme].tint }}>{"Friends"}</Text>

                        <FlatList
                            style={{ marginBottom: 30 }}
                            scrollEnabled={false}
                            data={friends}

                            renderItem={({ item, index }) =>
                                <UserListItem
                                    user={item}
                                    isTop={index === 0}
                                    isBottom={index === friends.length - 1}
                                    onPress={() => { props.navigation.navigate('Profile', { uid: item.uid }) }}
                                    type={'default'}



                                    onProfileButtonPress={() => props.navigation.navigate('Profile', { uid: item.uid })}
                                />
                            }
                        />
                    </View>}

                <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, marginBottom: 10, marginTop: 30, color: Colors[colorScheme].tint }}>{school.name + " Students"}</Text>
                <FlatList
                    style={{ marginBottom: 30 }}
                    scrollEnabled={false}
                    data={userResults}

                    renderItem={({ item, index }) =>
                        <UserListItem
                            user={item}
                            isTop={index === 0}
                            isBottom={index === userResults.length - 1}
                            onPress={() => { props.navigation.navigate('Profile', { uid: item.uid }) }}
                            type={'default'}



                            onProfileButtonPress={() => props.navigation.navigate('Profile', { uid: item.uid })}
                        />
                    }
                />

            </ScrollView>
        </View>

    )
}
const mapStateToProps = (store) => ({
    friends: store.userState.friends,
    users: store.usersState.users,
    school: store.schoolState.school,
    studyBuddies: store.userState.studyBuddies

})
export default connect(mapStateToProps, null)(Search)