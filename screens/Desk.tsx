import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { auth, db } from '../Firebase/firebase'
import { getItemLayout, haptics } from '../utils'
import DeskItemPreview from '../components/DeskItemPreview'
import useColorScheme from '../hooks/useColorScheme'
import Button from '../components/Button'
import { SHADOWS } from '../constants/Theme'
import { mainContainerStyle } from '../GlobalStyles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUserDesk, fetchUserFlashcards, fetchUserNotes } from '../redux/actions'
import CollapsibleView from "@eliav2/react-native-collapsible-view";
const Desk = (props) => {

    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const colorScheme = useColorScheme()
    const [showDeskTypeModal, setShowDeskTypeModal] = useState(false)
    const [deskItems, setDeskItems] = useState([])
    const [desk, setDesk] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedDeskItem, setSelectedDeskItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [results, setResults] = useState([])
    const [filters, setFilters] = useState([])
    const { currentUser, classes, notes, flashcards } = props;
    const [expanded, setExpanded] = useState(false)
    const deskTypes = ["Notes", "Flashcards", "Study Guides", "Readings", "Graded Work", "Games", "Other"]

    const isCurrentUser = () => {
        return props.route.params.uid === auth.currentUser.uid
    }


    useEffect(() => {
        if (isCurrentUser()) {
            props.fetchUserDesk()

            setDesk(props.desk)
            setDeskItems([
                ...props.flashcards,
                ...props.notes

            ])

        }
        else {
            db.collection('desks')
                .doc(props.route.params.uid)
                .onSnapshot(doc => {
                    setDesk(doc.data())
                    db.collection('desks')
                        .doc(props.route.params.uid)
                        .collection('deskItems')
                        .get()
                        .then(query => setDeskItems(query.docs.map(doc => doc.data())))

                })
        }





    }, [props.route.params.uid])

    const deskTypeModal = () => (
        <View style={{ backgroundColor: Colors[colorScheme].background, width: 100, height: 200, position: 'absolute', bottom: 30, right: 30, ...SHADOWS[colorScheme] }}>


        </View>
    )

    const onDeskSettingsPress = () => {
        console.log("Desk settings pressed")
        setShowModal(false)
    }

    const onClearDeskPress = () => {
        console.log("Clear Desk pressed")
        setShowModal(false)

    }


    const onBookmarkPress = () => {
        console.log("bookmark pressed")
    }



    const toggleIsPublic = () => {
        db.collection(selectedDeskItem.type.toLowerCase())
            .doc(selectedDeskItem.id)
            .update({
                isPublic: !selectedDeskItem.isPublic
            })
    }
    const deleteDeskItem = () => {
        console.log(selectedDeskItem.id)
        setShowDeskItemModal(false)
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection(selectedDeskItem.type.toLowerCase())
            .doc(selectedDeskItem.id)
            .delete()


    }
    const onDeletePress = () => {

        setShowDeskItemModal(false);
        setShowConfirmationModal(true);

    }


    const getItemLayout = (data, index) => {
        const productHeight = 80;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };


    const onBookmarkedPress = () => {
        setShowModal(false)
        //navigation.navigate('BookmarkedItems', { deskType: deskType, deskItems: getData() })
    }


    const onSharePress = () => {

    }
    const onEditPress = () => {

    }

    const filter = (name) => {

        const filteredData = deskItems.filter(item => item.class?.name && item.class.name === name)

        setSelectedClass(name)

        setResults(filteredData)



    }
    const isSelected = (item) => {

        return item.name === selectedClass
    }



    return (
        <View style={{ flex: 1 }}>
            <Header
                title={props.route.params.uid === auth.currentUser.uid ? 'Your Desk' : 'Desk'}
                navigation={props.navigation}
                style={{ backgroundColor: colorScheme === 'light' ? '#f4f4f4' : Colors.dark.background }}

            />
            <Modal
                transparent
                visible={showDeskTypeModal} >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setShowDeskTypeModal(false)}
                    style={{ backgroundColor: '#00000010', flex: 1, alignItems: 'center' }} >
                    <TouchableOpacity style={{ top: -10, }}>
                        <Image source={assets.close} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                    <CollapsibleView
                        style={{ position: 'absolute', bottom: 200, right: 30, backgroundColor: Colors[colorScheme].background, borderWidth: 0, borderRadius: 15, padding: 5, ...SHADOWS[colorScheme] }}
                        expanded={showDeskTypeModal}
                        noArrow
                        duration={600}

                    >
                        {deskTypes.map((deskType, i) => (
                            <TouchableOpacity
                                key={deskType}
                                onPress={() => {
                                    setShowDeskTypeModal(false)
                                    props.navigation.navigate('AddDeskItem', { deskType: deskType })
                                }}
                                style={{ paddingHorizontal: 10, paddingBottom: 10, paddingTop: i !== 0 && 10, borderBottomColor: '#00000020', borderBottomWidth: i !== deskTypes.length - 1 && 1 }}>
                                <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint }}>{deskType}</Text>
                            </TouchableOpacity>


                        ))}

                    </CollapsibleView>
                </TouchableOpacity>
            </Modal >

            <View style={[{ ...mainContainerStyle }, { backgroundColor: colorScheme === 'light' ? '#f4f4f4' : Colors.dark.background }]}>


                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 15, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint, paddingHorizontal: 10, padding: 5, marginBottom: 30, ...SHADOWS[colorScheme] }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{desk?.views}</Text>
                        <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Views"}</Text>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{desk?.likes}</Text>
                        <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Likes"}</Text>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{deskItems?.length}</Text>
                        <Text style={{ fontFamily: 'KanitLight', color: colorScheme === 'light' ? Colors.light.darkGray : Colors.dark.lightGray, fontSize: 16 }}>{"Posts"}</Text>

                    </View>
                </View>

                <View>


                    <FlatList

                        data={results}
                        style={{ height: '100%' }}
                        getItemLayout={getItemLayout}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator
                        renderItem={({ item }) =>




                            <DeskItemPreview
                                bottomFlashcardContainerStyle={{ width: 150, height: 70 }}
                                topContinaerStyle={{ width: 150, height: 40 }}
                                bottomContinaerStyle={{ width: 150 }}
                                style={{ margin: 15 }}
                                item={item}
                                onMorePress={(deskItem) => {
                                    setSelectedDeskItem(deskItem);
                                    setShowDeskItemModal(true);
                                }}
                                onPress={() => props.navigation.navigate('DeskItem', { deskItem: item })}

                                onLongPress={() => {
                                    haptics('light')
                                    setSelectedDeskItem(item);

                                    setShowDeskItemModal(true)
                                }}

                                deskType={item.type}
                            />

                        }
                    />


                </View>


            </View>
            <Button
                onPress={() => setShowDeskTypeModal(true)}
                style={{ borderRadius: 50, position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
            />


        </View >





    )

}
const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,

    },
    listItemTopContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        boderBottomWidth: 1,
        borderBottomeColor: 'lightgray',
        justifyContent: 'space-between',
        padding: 10
    },
    listItemBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 10
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        boderBottomWidth: 1,
        borderBottomeColor: 'lightgray',

        padding: 10
    },
    listItemText: {
        fontFamily: 'Kanit',
        fontSize: 16,
        marginLeft: 10
    }
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserDesk }, dispatch)

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    notes: store.userState.notes,
    flashcards: store.userState.flashcards,
    classes: store.userState.classes,
    desk: store.userState.desk

})

export default connect(mapStateToProps, mapDispatchProps)(Desk)