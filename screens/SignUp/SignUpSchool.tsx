import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { db } from '../../Firebase/firebase'
import { faker } from '@faker-js/faker'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import { SHADOWS } from '../../constants/Theme'
import { handleSearchByName } from '../../utils'
import StyledTextInput from '../../components/StyledTextInput'

const SignUpSchool = (props) => {
    const [school, setSchool] = useState(null)
    const [data, setData] = useState([])
    const colorScheme = useColorScheme()


    const defaultData = {
        id: faker.datatype.uuid(),
        scheduleType: null,
        logo: '',
        location: null,
        users: null,
        active: null


    }


    const onNextPressed = () => {

        props.navigation.navigate('SignUpAvatar', { ...props.route.params, school: school.id })
    }


    useEffect(() => {
        const subscriber = db.collection('schools')

            .onSnapshot(query => {


                setData(query.docs.map((doc) => ({
                    ...doc.data()
                })))


            })
        return () => {
            subscriber()
        }
    }, [])



    const onSelectSchoolPress = () => {
        props.navigation.navigate('SearchSelect', {
            update: setSchool,
            placeholder: 'Search schools',
            title: 'Add School',
            data: data,
            collectionPath: 'schools',
            handleSearch: handleSearchByName,
            selectionLimit: 1

        })
    }
    const onBackPressed = () => {
        props.navigation.goBack()
    }


    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>

            <Header navigation={props.navigation} />
            <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>


                <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{"What school do you go to?"}</Text>
                <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{descriptions.school}</Text>

                <StyledTextInput
                    style={{ fontFamily: 'KanitMedium' }}
                    onPress={onSelectSchoolPress}
                    editable={false}
                    placeholder={!school ? "Select a School" : school.name}
                    icon={<Image source={!school ? assets.grad_cap : assets.pencil} style={{ width: 22, height: 22, tintColor: Colors[colorScheme].tint }} />}
                    placeholderTextColor={Colors[colorScheme].tint}

                />









                <Button
                    title={'Next'}
                    onPress={onNextPressed}
                    style={{ width: '50%', marginTop: 20 }}
                    disabled={!school}
                />


            </View>
        </View >
    )
}




export default SignUpSchool

