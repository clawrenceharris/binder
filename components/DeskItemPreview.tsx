import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DeskItem } from '../types';
import { assets, Colors } from '../constants';
import { StyleSheet } from 'react-native';
import { SHADOWS } from '../constants/Theme';
import { getDisplayNameOrYou } from '../utils';
import ProfileButton from './ProfileButton';
import useColorScheme from '../hooks/useColorScheme';
import { auth, db } from '../Firebase/firebase';


interface Props {
    item: DeskItem;
    onLongPress?: (item: DeskItem) => void;
    onMorePress?: (item: DeskItem) => void;
    onPress: (item: DeskItem) => void;
    style?: ViewStyle;
    deskType: string;
    bottomContinaerStyle?: ViewStyle;
    topContinaerStyle?: ViewStyle;
    bottomFlashcardContainerStyle?: ViewStyle;
}
const DeskItemPreview: FC<Props> = (props) => {

    const colorScheme = useColorScheme();
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        db.collection('users')
            .doc(props.item.ownerUID)
            .get()
            .then(doc => {
                setOwner(doc.data())


            })


    }, [])


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={() => props.onLongPress(props.item)}
            onPress={() => props.onPress(props.item)}
            style={[{ ...SHADOWS[colorScheme] }, { ...props.style }]}>

            <View style={[styles.topContinaer, { width: props.deskType != "Flashcards" ? 160 : 190, ...props.topContinaerStyle }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <ProfileButton imageURL={owner?.photoURL} size={25} containerStyle={{ marginRight: 10 }} />
                        <Text style={{ fontWeight: '500', color: Colors.light.tint, fontFamily: 'Kanit' }}>{getDisplayNameOrYou(owner)}</Text>
                    </View>
                    <Image
                        source={props.item?.isPublic ? assets.unlock : assets.lock}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: props.item?.isPublic ? Colors.accent : 'black',

                        }} />


                </View>

            </View>
            {props.deskType.toLowerCase() !== "flashcards" ? <View>




                <View style={[styles.bottomContainer, { ...props.bottomContinaerStyle }]}>
                    {props.item?.files?.length > 0 &&

                        <Image source={{ uri: props.item.files[0] }} style={styles.image} />}
                    <View style={styles.imageOverlay} />

                    <View style={styles.titleContianer}>
                        {props.item?.sectionNumber && <Text style={{ color: 'lightgray', fontFamily: 'Kanit' }}>{props.item?.section + " " + props.item?.sectionNumber}</Text>}
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', width: "100%", alignSelf: 'center', fontFamily: 'KanitBold' }}>{props.item?.title}</Text>
                    </View>



                </View>

            </View>
                :
                <View>

                    <View style={[styles.bottomFlashcardContainer, { width: props.deskType != "Flashcards" ? 160 : 190, ...props.bottomFlashcardContainerStyle }]}>
                        {props.item?.sectionNumber != null &&
                            <Text style={styles.sectionNumberText}>{props.item.section + " " + props.item.sectionNumber}</Text>}
                        <Text style={styles.titleText}>{props.item?.title}</Text>
                    </View>
                </View>
            }



        </TouchableOpacity>


    )
}
const styles = StyleSheet.create({
    publicIcon: {
        width: 20,
        height: 20,


    },


    sectionNumberText: {
        color: 'gray',
        fontFamily: 'Kanit'
    },

    bottomFlashcardContainer: {
        padding: 20,
        width: 190,
        height: 70,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    titleText: {
        color: Colors.accent,
        fontSize: 18,
        textAlign: 'center',
        width: "100%",
        fontFamily: 'KanitBold'
    },

    topContinaer: {
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    titleContianer: {
        position: 'absolute',
        top: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    image: {
        width: '100%',
        height: '100%',

    },

    profileImage: {
        backgroundColor: 'gray',
        width: 25,
        height: 25,
        marginRight: 10,
        borderRadius: 50
    },

    bottomContainer: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
        width: 160,
        height: 170

    },

    imageOverlay: {
        width: 250,
        height: 200,

        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7

    }
})
export default DeskItemPreview