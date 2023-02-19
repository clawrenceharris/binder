import { View, Text, Image, FlatList, useColorScheme, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import OptionsModal from '../components/OptionsModal';
import Button from '../components/Button';
import Header from '../components/Header';
import { assets, Colors } from '../constants';
import DeskItemPreview from '../components/DeskItemPreview';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase/compat'
import { ActivityBadge } from '../components/ProfileBadges';
import { ProfileButton } from '../components';
import MoreButton from '../components/MoreButton';
import { SHADOWS, SIZES } from '../constants/Theme';
import { haptics } from '../utils';
import FilterTag from '../components/FilterTag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserClasses, fetchUserFlashcards } from '../redux/actions'

const DeskItems = (props) => {
    const [desk, setDesk] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const deskType = props.route.params.deskType
    const [selectedDeskItem, setSelectedDeskItem] = useState(null)
    const colorScheme = useColorScheme()
    const [loading, setLoading] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [results, setResults] = useState([])
    const [filters, setFilters] = useState([])
    const { currentUser, classes, notes, flashcards } = props;

    useEffect(() => {



        switch (deskType) {
            case "Flashcards": setResults(flashcards); setDesk(flashcards); break;
            case "Notes": setResults(notes); setDesk(notes); break;

        }


    }, [])


    const onAddPress = () => {

        setShowModal(false)

        props.navigation.navigate('AddDeskItem', { deskType: deskType })


    }

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
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection(deskType.toLowerCase())
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
            .collection(deskType.toLowerCase())
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

        const filteredData = desk.filter(item => item.class?.name && item.class.name === name)

        setSelectedClass(name)

        setResults(filteredData)



    }
    const isSelected = (item) => {

        return item.name === selectedClass
    }





    const headerRight = () => (

        <MoreButton onPress={() => setShowModal(true)} />
    )
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title={'Your ' + deskType}
                color={Colors.white}
                headerRight={headerRight()}
                navigation={props.navigation}
                style={{ backgroundColor: Colors.primary, height: SIZES.header }}

            />

            <View style={{ padding: 10, backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 15, marginTop: 10 }}>

                <OptionsModal
                    showModal={showModal}
                    options={['Bookmarked ' + deskType, 'New ' + deskType, 'Desk Settings', 'Clear Desk']}
                    redIndex={2}
                    toValue={-350}
                    onCancelPress={() => setShowModal(false)}
                    onOptionPress={[onBookmarkedPress, onAddPress, onDeskSettingsPress, onClearDeskPress]}
                />

                <OptionsModal
                    showModal={showDeskItemModal}
                    options={['Bookmark', 'Share', 'Edit', 'Public', 'Delete']}
                    redIndex={5}
                    toValue={-460}
                    switchIndex={3}
                    onToggle={toggleIsPublic}
                    isOn={selectedDeskItem?.isPublic}
                    onCancelPress={() => setShowDeskItemModal(false)}
                    onOptionPress={[onBookmarkPress, onSharePress, onEditPress, toggleIsPublic, onDeletePress]}
                />


                {/* <ConfirmationModal
                    message={'Permanently delete these ' + deskType + ' from your Desk? This action cannot be undone'}
                    showModal={showConfirmationModal}
                    onCancelPress={() => setShowConfirmationModal(false)}
                    onConfirmPress={() => { setShowConfirmationModal(false); deleteDeskItem(); }}
                /> */}
                <View>
                    <FlatList
                        data={currentUser.classes}
                        style={{ marginTop: 20 }}
                        numColumns={3}
                        getItemLayout={getItemLayout}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <FilterTag
                                data={item.name}
                                isSelected={isSelected(item)}
                                onPress={() => { filter(item.name) }}
                                style={{ marginLeft: 10, marginBottom: 8, maxWidth: 100 }}
                                key={index.toString()} />}
                    />
                </View>

                {!desk.length &&
                    <Text style={{ fontFamily: 'Kanit', color: '#00000050', alignSelf: 'center', marginTop: '50%' }}>{"This desk is empty 🗃"}</Text>
                }


                <View>


                    <FlatList

                        data={results}
                        style={{ marginBottom: 200 }}
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
                                onPress={(deskItemData) => props.navigation.navigate('DeskItem', { deskItem: item, deskType: deskType })}

                                onLongPress={() => {
                                    haptics('light')
                                    setSelectedDeskItem(item);

                                    setShowDeskItemModal(true)
                                }}

                                deskType={deskType}
                            />

                        }
                    />


                </View>




            </View>

            <Button
                onPress={onAddPress}
                style={{ borderRadius: 50, position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
            />


        </View>

    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserFlashcards }, dispatch)

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    notes: store.userState.notes,
    flashcards: store.userState.flashcards,
    classes: store.userState.classes

})

export default connect(mapStateToProps, mapDispatchProps)(DeskItems)