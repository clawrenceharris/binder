import { View, Text, ScrollView, Image, TouchableOpacity, useColorScheme, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../constants';
import OptionsModal from '../components/OptionsModal';
import { getItemLayout, openMediaLibrary } from '../utils';
import Header from '../components/Header';
import Button from '../components/Button';
import FlashcardEditPreview from '../components/DeskItemEditPreview';
import DeskItemEditPreview from '../components/DeskItemEditPreview';
import EditFlashcard from '../components/EditFlashcard';
import { SIZES } from '../constants/Theme';

const AddDeskItem = ({ navigation, route }) => {
    const colorScheme = useColorScheme();
    const [title, setTitle] = useState('');

    const [selectedCard, setSelectedCard] = useState('')
    const [isFrontImage, setIsFrontImage] = useState(false);
    const [isBackImage, setIsBackImage] = useState(false);
    const [cardFront, setCardFront] = useState('');
    const [cardBack, setCardBack] = useState('');
    const [cards, setCards] = useState([]);
    const [files, setFiles] = useState([]);
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [inputFiles, setInputFiles] = useState(['input'])
    const [imageScrollRef, setImageScrollRef] = useState(null);
    const deskType = route.params.deskType;

    const addImage = (image) => {
        if (deskType === "Flashcards") {
            if (selectedCard === "cardFront") {

                setIsFrontImage(true);
                setCardFront(image)
            }


            else {
                setIsBackImage(true);
                setCardBack(image)

            }
        } else {
            setFiles([...files, image])
            setInputFiles([image, ...inputFiles])
        }


    }

    const onLibraryPress = async () => {
        setShowImageOptionsModal(false);
        const result = await openMediaLibrary('photo', 1);
        if (result != null)
            addImage(result)



    }

    const onTakePicturePress = () => {

        setShowImageOptionsModal(false);
        navigation.navigate('Camera', { canRecord: false, setImage: addImage });
    }

    const deleteCard = (card) => {
        setCards(cards.filter(item => item != card))
    }
    const deleteFile = (file) => {
        setFiles(files.filter(item => item != file))
        setInputFiles(inputFiles.filter(item => item != file))

    }
    const canContinue = () => {
        return (files.length > 0 || cards.length > 0) && title.length > 0
    }
    return (

        <View style={{ flex: 1, backgroundColor: Colors.primary }}>


            <Header
                navigation={navigation}
                title={'New ' + deskType}
                direction={'vertical'}
                color={Colors.white}
                style={{ backgroundColor: Colors.primary, height: SIZES.header }}

            />


            <ScrollView
                style={{ padding: 15, marginTop: 10, borderRadius: 25, backgroundColor: Colors[colorScheme].background }}
                ref={(ref) => setScrollRef(ref)}
                showsVerticalScrollIndicator={false}>


                <OptionsModal
                    options={['Take Picture', 'Choose From Library']}
                    onOptionPress={[onTakePicturePress, onLibraryPress]}
                    showModal={showImageOptionsModal}
                    onCancelPress={() => { setShowImageOptionsModal(false) }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                    <Image source={assets.pencil} style={{ width: 30, height: 30, tintColor: 'lightgray', marginRight: 10 }} />

                    <TextInput
                        style={[styles.titleInput, { color: Colors[colorScheme].tint }]}
                        placeholder='Title'
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={'darkgray'}
                        selectionColor={Colors.accent}
                        returnKeyType='done'
                        returnKeyLabel='done'
                    />


                </View>

                {
                    deskType !== 'Flashcards' ?

                        <Text style={styles.sectionHeaderText}>{"Images"}</Text>

                        :

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Text style={styles.sectionHeaderText}>{'Cards'}</Text>
                            {cardFront && cardBack &&

                                <Text
                                    onPress={() => {
                                        cards.push({
                                            cardFront: {
                                                data: cardFront, isImage: isFrontImage
                                            },
                                            cardBack: { data: cardBack, isImage: isBackImage }
                                        });
                                        setCardBack('');
                                        setCardFront('');
                                        setIsBackImage(false);
                                        setIsFrontImage(false);

                                    }}
                                    style={{ fontFamily: 'KanitMedium', color: Colors.accent, fontSize: 18, marginVertical: 20 }}>{'Save Card'}</Text>}
                        </View>

                }
                {deskType === 'Flashcards' &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>


                        <EditFlashcard
                            isImage={isFrontImage}
                            value={cardFront}
                            isFront={true}
                            onChangeText={(value) => setCardFront(value)}
                            onRemovePress={() => { setIsFrontImage(false); setCardFront(''); }} />

                        <EditFlashcard
                            isImage={isBackImage}
                            value={cardBack}
                            isFront={false}
                            onChangeText={(value) => setCardBack(value)}
                            onRemovePress={() => { setIsBackImage(false); setCardBack(''); }} />

                    </View>}




                {deskType !== "Flashcards" &&

                    <FlatList
                        numColumns={2}
                        style={{ marginBottom: 100 }}
                        scrollEnabled={false}
                        getItemLayout={getItemLayout}
                        data={files}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>

                            <DeskItemEditPreview
                                onRemovePress={() => deleteFile(item)}
                                file={item}
                                isFlashcard={false} />




                        }
                        ListFooterComponent={<TouchableOpacity
                            onPress={() => setShowImageOptionsModal(true)}
                            style={{ width: 150, height: 150, backgroundColor: '#00000010', borderRadius: 15, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                            <Image source={assets.add} style={{ width: 40, height: 40, tintColor: 'darkgray' }} />


                        </TouchableOpacity>}
                    />}









                <View>
                    {cards.map((card, index) =>
                        <View

                            key={index.toString()}>


                            <DeskItemEditPreview
                                isFlashcard
                                cardFront={card.cardFront.data}
                                cardBack={card.cardBack.data}
                                isCardBackImage={card.cardBack.isImage}
                                isCardFrontImage={card.cardFront.isImage}
                                onRemovePress={() => deleteCard(card)}
                                style={{ marginBottom: index === cards.length - 1 && 150, marginRight: 10 }} />

                        </View>
                    )}




                </View>



            </ScrollView>
            {canContinue() &&
                <Button
                    style={{ position: 'absolute', bottom: 30, width: '60%' }}
                    title={"Continue"}
                    onPress={() => navigation.navigate('SaveDeskItem', {
                        deskType: deskType,
                        cards: cards,
                        files: files,
                        title: title
                    })}
                    disabled={!canContinue}

                />}
        </View>
    )
}

const styles = StyleSheet.create({


    sectionNumberInput: {
        marginLeft: 20,
        fontFamily: 'Kanit',
        fontSize: 16,
        backgroundColor: '#00000010',
        borderRadius: 15,
        paddingHorizontal: 30,
        height: 60
    },

    descriptionInput: {
        fontFamily: 'Kanit',
        fontSize: 16,
        backgroundColor: '#00000010',
        borderRadius: 15,
        padding: 10,
        height: 100
    },

    titleInput: {
        flexDirection: 'row',
        width: '100%',
        fontFamily: 'Kanit',
        fontSize: 28,
        color: 'white'
    },

    sectionHeaderText: {
        fontFamily: 'KanitMedium',
        color: 'gray',
        fontSize: 18,
        marginVertical: 20
    },





})
export default AddDeskItem