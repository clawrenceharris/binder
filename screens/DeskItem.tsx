import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import Header from '../components/Header'
import OptionsModal from '../components/OptionsModal'
import { auth, db } from '../Firebase/firebase'
import ScrollableImages from '../components/ScrollableImages'
import ScrollableFlashcards from '../components/ScrollableFlashcards'
import MoreButton from '../components/MoreButton'
import { mainContainerStyle } from '../GlobalStyles'
const DeskItem = ({ navigation, route }) => {

    const { deskItem } = route.params;
    const [showModal, setShowModal] = useState(false)
    const colorScheme = useColorScheme()
    const headerRight = () => (

        <MoreButton onPress={() => setShowModal(true)} />
    )
    //useEffect(() => {
    //     db.collection('desks')
    //         .doc(deskItem.ownerUID)
    //         .get()
    //         .then(doc => {

    //             if (deskCategory === "Flashcards") {
    //                 doc.data().flashcards.forEach(item => {
    //                     if (item.id == id) {
    //                         setDeskItem(item)
    //                     }

    //                 })

    //             }

    //             if (deskCategory === "Notes") {
    //                 doc.data().notes.forEach(item => {
    //                     if (item.id == id) {
    //                         setDeskItem(item)
    //                     }

    //                 })

    //             }

    //         })


    // }, [])

    const toggleIsPublic = () => {
        db.collection(deskType.toLowerCase())
            .doc(deskItem.id)
            .update({
                isPublic: !deskItem.isPublic
            })
    }

    const onBookmarkPress = () => {
        setShowModal(false)
    }


    const onSharePress = () => {
        setShowModal(false)
    }

    const onEditPress = () => {
        setShowModal(false)
    }

    const onPublicPress = () => {
        setTimeout(() => setShowModal(false), 500)
    }


    const onDeletePress = () => {

    }
    console.log(deskItem.cards)


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, borderRadius: 15 }}>
            <Header
                navigation={navigation}
                title={deskItem.type}
                direction={'vertical'}
                headerRight={headerRight()}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}
            />

            <ScrollView style={[{ ...mainContainerStyle }, { backgroundColor: colorScheme === 'light' ? '#f4f4f4' : Colors.dark.background, borderRadius: 15 }]}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>


                    <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 24 }}>{deskItem.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {deskItem.class &&
                            <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 18 }}>{deskItem.class.name + ": "}</Text>}

                        {deskItem.sectionNumber &&
                            <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 18 }}>{deskItem.section + " " + deskItem.sectionNumber}</Text>}


                    </View>

                </View>

                <OptionsModal
                    showModal={showModal}
                    options={['Bookmark', 'Share', 'Edit', 'Public', 'Delete']}
                    redIndex={5}
                    toValue={-400}
                    switchIndex={3}
                    onToggle={toggleIsPublic}
                    isOn={deskItem?.isPublic}

                    onCancelPress={() => setShowModal(false)}
                    onOptionPress={[onBookmarkPress, onSharePress, onEditPress, onPublicPress, onDeletePress]}
                />

                {deskItem.type !== 'Flashcards' ?

                    <ScrollableImages images={deskItem.files} />

                    :

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>


                        <ScrollableFlashcards flashcards={deskItem.cards} />


                    </View>


                }


                {deskItem.description && <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.sectionHeaderText}>{"Description"}</Text>
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint }}>{deskItem.description}</Text>
                </View>}

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    sectionHeaderText: {
        fontFamily: 'KanitMedium',
        color: 'darkgray',
        fontSize: 18,
        marginVertical: 20
    }
})

export default DeskItem