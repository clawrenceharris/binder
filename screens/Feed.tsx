import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Classes from '../constants/data/Classes'
import ClassChatListItem from '../components/ClassChatListItem'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Colors, assets } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { ProfileButton } from '../components'
import Header from '../components/Header'
import { db } from '../Firebase/firebase'
import BackButton from '../components/BackButton'
import Button from '../components/Button'



export default function Feed(props) {

    const colorScheme = useColorScheme()
    const [classData, setClassData] = useState(null)
    const [users, setUsers] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        const subscriber = db.collection('classes')
            .doc(props.route.params.id).get().then(doc => {
                setClassData(doc.data())

            })
        return () => {
        }
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                title={'Feed'}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}

            />

            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'Kanit', color: 'white', textAlign: 'center' }}>{"This is the classroom feed for " + classData?.name + ". Post anything in your Desk like Notes or Flashcards and more!"}</Text>

                <Button
                    title={'Make a Post'}
                    onPress={function (): void {
                        alert('This feature is not yet ready for use. Check again later.')
                    }}
                    style={{ marginTop: '50%' }}

                />

            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    addChatBtn: {
        bottom: 20,
        right: 20,
        backgroundColor: Colors.accent,
        width: 70,
        height: 70,
        position: 'absolute',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    subHeaderTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 16,
        marginLeft: 10
    }
})

