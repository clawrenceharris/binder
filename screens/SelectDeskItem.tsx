import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { auth, db } from '../Firebase/firebase'
import { Dropdown } from 'react-native-element-dropdown'
import DeskItemPreview from '../components/DeskItemPreview'
import { useNavigation } from '@react-navigation/native'

const SelectDeskItem = ({ route }) => {
    const colorScheme = useColorScheme()
    const [desk, setDesk] = useState(null)
    const [deskType, setDeskType] = useState('Notes')
    const navigation = useNavigation()
    const { onSelect } = route.params
    const [loading, setLoading] = useState(true)
    const data = [
        { label: 'Notes', value: 'Notes' },
        { label: 'Flashcards', value: 'Flashcards' },
        { label: 'Study Guides', value: 'Study Guides' },
        { label: 'Readings', value: 'Readings' },
        { label: 'Graded Work', value: 'Graded Work' },
        { label: 'Other', value: 'Other' },
    ]

    useEffect(() => {
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection(deskType.toLowerCase())
            .get()
            .then(query => {
                setDesk(query.docs.map((doc) => (
                    {
                        data: doc.data(),
                        id: doc.id
                    }
                )))
                setLoading(false)

            })

    }, [deskType])

    const getItemLayout = (data, index) => {
        const productHeight = 80;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background, padding: 10 }}>

            <Dropdown
                data={data}
                value={deskType}
                onChange={item => { setDeskType(item.value) }}
                placeholderStyle={{ color: 'darkgray', fontFamily: 'Kanit' }}
                style={{ marginTop: 20, borderRadius: 15, backgroundColor: '#00000010', padding: 10 }}
                containerStyle={{ backgroundColor: 'lightgray', borderWidth: 0, borderRadius: 15 }}
                labelField="label"
                valueField="value"
                itemContainerStyle={{ backgroundColor: 'lightgray', borderRadius: 15 }}
                itemTextStyle={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint }}
                selectedTextStyle={{ fontFamily: 'KanitBold', color: Colors.accent }}
                fontFamily='KanitSemiBold'
                showsVerticalScrollIndicator={false}
                autoScroll={false}
                placeholder={deskType}
            />
            <FlatList

                style={{ height: '51%' }}
                data={desk}
                getItemLayout={getItemLayout}
                numColumns={2}
                keyExtractor={(item) => item.id}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator
                renderItem={({ item }) =>

                    <DeskItemPreview
                        style={{ margin: 20 }}
                        onPress={() => { navigation.goBack(); onSelect(deskType.toLowerCase(), item.data, '') }}
                        item={item.data}
                        deskType={deskType}
                        bottomFlashcardContainerStyle={{ width: 150, height: 70 }}
                        topContinaerStyle={{ width: 150, height: 40 }}
                        bottomContinaerStyle={{ width: 150 }}
                    />

                }

            />
        </View>
    )
}

export default SelectDeskItem