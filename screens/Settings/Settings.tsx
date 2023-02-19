import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/firebase'
import SettingsListItem from '../../components/SettingsListItem'
import moment from 'moment'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Colors } from '../../constants'
import { SHADOWS } from '../../constants/Theme'
import useColorScheme from '../../hooks/useColorScheme'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserSchool } from '../../redux/actions'
import { StatusBar } from 'expo-status-bar'
import { ConfirmationModal } from '../../components/Modals'

const Settings = (props) => {
    const [schoolData, setSchoolData] = useState(null)
    const colorScheme = useColorScheme()
    const [showLogOutConfirmationModal, setShowLogOutConfirmationModal] = useState(false)
    const { currentUser, school } = props
    const [loading, setLoading] = useState(false)
    const logOut = async () => {
        setLoading(true)
        //log user out of firebase
        try {
            await auth.signOut().then(() => setLoading(false));


        } catch (error) {
            console.log(error);
        }


    }


    useEffect(() => {
        props.fetchUser()
        props.fetchUserSchool()

    }, [])


    const styles = StyleSheet.create({


        sectionTitle: {
            fontFamily: 'KanitBold',
            fontSize: 18,
            color: Colors[colorScheme].tint,
            marginBottom: 10,
            marginTop: 30
        },
        sectionContainer: {

            ...SHADOWS[colorScheme],
            shadowRadius: 10
        }
    })



    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background }}>
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />


            <ConfirmationModal

                message='Log out of your account?'
                onConfirmPress={() => {
                    logOut()
                }}
                onCancelPress={() => setShowLogOutConfirmationModal(false)}
                loading={loading}

            />


            <Header
                navigation={props.navigation}
                direction={'horizontal'}
                title={'Settings'}
                style={{ backgroundColor: colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background }}

            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 10 }}
            >
                <Text style={styles.sectionTitle}>{'Account Settings'}</Text>

                <View style={styles.sectionContainer}>


                    <SettingsListItem
                        title='Name'
                        value={currentUser.displayName}
                        isTop={true}
                        onPress={() => { props.navigation.navigate('NameSettings', { displayName: currentUser.displayName }) }}
                    />


                    <SettingsListItem
                        title='Birthday'
                        value={moment(currentUser?.birthday?.toDate())?.format('MMM DD, YYYY')}
                        onPress={() => { props.navigation.navigate('BirthdaySettings', { birthday: currentUser.birthday }) }}
                    />


                    <SettingsListItem
                        title='Email'
                        value={auth.currentUser?.email}
                        titleColor={!auth.currentUser.emailVerified ? Colors.light.red : 'white'}
                        onPress={() => props.navigation.navigate('EmailSettings', { email: auth.currentUser.email })}
                    />

                    <SettingsListItem
                        title='Password'
                        isBottom={true}
                        onPress={() => props.navigation.navigate('PasswordSettings')}

                    />

                </View>

                <Text style={styles.sectionTitle}>{'School Settings'}</Text>

                <View style={styles.sectionContainer}>


                    <SettingsListItem
                        title='School'
                        value={school?.name}
                        onPress={() => props.navigation.navigate('SchoolSettings', { school: school })}
                        isTop={true}

                    />

                    <SettingsListItem
                        title='Graduation Year'
                        value={currentUser.gradYear}
                        onPress={() => props.navigation.navigate('GraduationYearSettings', { gradYear: currentUser.gradYear })}

                    />

                    <SettingsListItem
                        title='GPA'
                        value={currentUser.gpa}
                        onPress={() => props.navigation.navigate('GPASettings', { gpa: currentUser.gpa })}
                        isBottom={true}

                    />

                </View>

                <Text style={styles.sectionTitle}>{'Desk Settings'}</Text>

                <View style={styles.sectionContainer}>

                    <SettingsListItem
                        title='Desk Privacy'
                        onPress={() => props.navigation.navigate('DeskPrivacy')}
                        isTop
                        isBottom
                    />




                </View>



                <Button
                    title={'Log Out'}
                    background={colorScheme === 'light' ? '#F8F8F8' : Colors.dark.background}
                    tint={Colors.accent}
                    style={{ marginVertical: 40 }}
                    onPress={() => setShowLogOutConfirmationModal(true)}
                />




            </ScrollView>

        </View>
    )
}



const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    school: store.schoolState.school
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserSchool }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Settings)