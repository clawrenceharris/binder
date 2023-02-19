import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import Chat from './Chat'
import Classes from './Classes'
import CameraScreen from './CameraScreen'
import { ProfileButton } from '../components'
import { ActivityBadge } from '../components/ProfileBadges'
import { headerButton, headerTitleStyle } from '../GlobalStyles'
import Swiper from '../components/Swiper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserSchool, fetchUserDesk, fetchUserFlashcards, fetchUserNotes, fetchUserStudyBuddies, fetchUserFriends, fetchRanks, fetchSchoolClasses } from '../redux/actions'
import { assets, Colors } from '../constants'
import { SIZES } from '../constants/Theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { withHooksHOC } from '../components/withHooksHOC'
import Desk from './Desk'
import useColorScheme from '../hooks/useColorScheme'
import { current } from '@reduxjs/toolkit'
import Profile from './Profile'
import { auth } from '../Firebase/firebase'
import { TwelvePointBurst } from '../components/shapes'
import Cookies from './Cookies'
import StudyBuddies from './StudyBuddies'

const ICON_SIZE = 28

const BottomTab = createBottomTabNavigator();

const Main = (props) => {
    const cookieScaleValue = useRef(new Animated.Value(1)).current
    const studyBuddyScaleValue = useRef(new Animated.Value(1)).current

    const colorScheme = useColorScheme();
    const { currentUser } = props
    const [loading, setLoading] = useState(true)

    const grow = (scaleValue) => {
        Animated.spring(scaleValue, {
            toValue: 1.5,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const shrink = (scaleValue) => {
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {

        props.fetchUser()
        props.fetchRanks()
        props.fetchUserFriends()
        props.fetchSchoolClasses()
    }, [])





    const headerRight = () => (
        <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
                onPress={() => { props.navigation.navigate('Desk', { uid: auth.currentUser.uid }) }}
                style={[{ ...headerButton }, {
                    backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint,
                    right: 20
                }]}>
                <Image source={assets.desk} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].tint }} />


            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { }}
                style={[{ ...headerButton }, {
                    backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint,
                    right: 10
                }]}>
                <Image source={assets.more} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].tint }} />


            </TouchableOpacity>
        </View>
    )

    const headerLeft = () => (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


            <View style={{ left: 10, padding: 2, borderWidth: 1.5, borderColor: Colors.primary, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>

                <ProfileButton
                    size={headerButton.width}
                    imageURL={currentUser?.photoURL}
                    onPress={() => props.navigation.navigate('Profile', { uid: auth.currentUser.uid })}
                />




            </View>

            <TouchableOpacity
                onPress={() => { props.navigation.navigate('Search') }}
                style={[{ ...headerButton }, {
                    backgroundColor: colorScheme === 'light' ? Colors.light.gray : Colors.light.tint,
                    marginLeft: 20
                }]}>
                <Image source={assets.search} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].tint }} />


            </TouchableOpacity>
        </View>



    )


    if (!currentUser) {
        return (
            <View style={{ backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={Colors.white} />
            </View>


        )
    }

    else if (!currentUser.photoURL && !currentUser.displayName && !currentUser.birthday && !currentUser.school) {

        props.navigation.navigate('SignUpName')
        return (<View style={{ flex: 1, backgroundColor: Colors.primary }}></View>)
    }
    else {
        return (
            <BottomTab.Navigator
                initialRouteName="Classes"
                screenOptions={{

                    tabBarStyle: {
                        backgroundColor: Colors[colorScheme].background,
                        height: '12%',
                        borderTopColor: Colors[colorScheme].darkGray,
                    },
                    tabBarActiveTintColor: Colors.primary,
                    headerStyle: { backgroundColor: colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background, height: SIZES.header },
                    headerTitleStyle: { fontFamily: 'KanitMedium', fontSize: 24, color: Colors[colorScheme].tint },
                    headerShadowVisible: false,
                    tabBarInactiveTintColor: 'rgb(225,228,233)',
                    tabBarShowLabel: false,

                    // tabBarBadge: '',
                    // tabBarBadgeStyle: { backgroundColor: Colors.primary, borderWidth: 4, borderColor: 'black' },

                }}>
                <BottomTab.Screen
                    name="StudyBuddies"
                    component={StudyBuddies}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            grow(studyBuddyScaleValue)
                            shrink(cookieScaleValue)
                        }
                    })}
                    options={{

                        headerRight,
                        headerLeft,
                        headerShown: true,
                        title: 'Study Buddies',
                        tabBarIcon: ({ color, focused }) => (

                            <Animated.Text style={{ fontSize: ICON_SIZE, left: 0.5, transform: [{ scale: studyBuddyScaleValue }] }}>🤓</Animated.Text>
                        )


                    }}

                />



                <BottomTab.Screen
                    name="Classes"
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            shrink(studyBuddyScaleValue)
                            shrink(cookieScaleValue)
                        }
                    })}
                    component={Classes}
                    options={{

                        headerRight,
                        headerLeft,
                        headerShown: true,
                        title: 'Classes',
                        tabBarIcon: ({ color, focused }) => (

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={focused ? assets.book : assets.book_o} style={{ tintColor: focused ? Colors.primary : Colors[colorScheme].darkGray, width: ICON_SIZE, height: ICON_SIZE }} />
                            </View>
                        )


                    }}

                />

                <BottomTab.Screen
                    name="Camera"
                    component={CameraScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            shrink(studyBuddyScaleValue)
                            shrink(cookieScaleValue)
                        }
                    })}
                    options={{

                        headerStyle: { height: 5 },

                        title: '',
                        tabBarIcon: ({ color, focused }) => (


                            <Image
                                source={focused ? assets.capture : assets.capture_o}
                                style={{ tintColor: focused ? Colors.primary : Colors[colorScheme].darkGray, width: ICON_SIZE, height: ICON_SIZE }}
                            />

                        ),

                    }}
                />


                <BottomTab.Screen
                    name="Chat"
                    component={Chat}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            shrink(studyBuddyScaleValue)
                            shrink(cookieScaleValue)
                        }
                    })}
                    options={{
                        headerRight,
                        headerLeft,

                        headerShown: true,

                        title: 'Chat',
                        tabBarIcon: ({ color, focused }) => (

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={focused ? assets.chat : assets.chat_o} style={{ tintColor: focused ? Colors.primary : Colors[colorScheme].darkGray, width: ICON_SIZE, height: ICON_SIZE }} />
                            </View>
                        )
                    }}
                />

                <BottomTab.Screen
                    name="Cookies"
                    component={Cookies}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            shrink(studyBuddyScaleValue)
                            grow(cookieScaleValue)
                        }
                    })}
                    options={{

                        headerRight,
                        headerLeft,
                        headerShown: true,
                        title: 'Cookies',
                        tabBarIcon: ({ color, focused }) => (



                            <Animated.Text style={{ fontSize: ICON_SIZE, transform: [{ scale: cookieScaleValue }] }}>🍪</Animated.Text>


                        )


                    }}

                />
            </BottomTab.Navigator>


        )
    }

}



const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    school: store.userState.school
})

const mapDispatchProps = (dispatch) =>
    bindActionCreators({
        fetchUserStudyBuddies,
        fetchUser,
        fetchUserFlashcards,
        fetchUserDesk,
        fetchUserNotes,
        fetchUserSchool,
        fetchUserFriends,
        fetchRanks,
        fetchSchoolClasses
    }, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(Main)