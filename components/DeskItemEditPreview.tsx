import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { assets, Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import FlippableFlashcard from './FlippableFlashcard';
import { SHADOWS } from '../constants/Theme';

interface Props {
    cardFront?: string;
    cardBack?: string;
    isCardFrontImage?: boolean;
    isCardBackImage?: boolean;
    onRemovePress: () => void;
    style?: ViewStyle;
    isFlashcard?: boolean;
    file?: string;

}
const DeskItemEditPreview: FC<Props> = (props) => {
    const colorScheme = useColorScheme();
    return (
        <View style={[{ width: '100%', alignItems: 'center', justifyContent: 'center', ...props.style }]}>
            {props.isFlashcard && <TouchableOpacity
                onPress={props.onRemovePress}
                style={[styles.cornerButton, { backgroundColor: Colors.red }]}>
                <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
            </TouchableOpacity>}
            {props.isFlashcard || false ?
                <View style={[styles.mainContainer]}>

                    <FlippableFlashcard
                        containerStyle={{ shadowColor: '#00000040', marginTop: 82 }}
                        width={240}
                        height={150}
                        card={{
                            cardFront: {
                                data: props.cardFront, isImage: props.isCardFrontImage
                            },
                            cardBack: { data: props.cardBack, isImage: props.isCardBackImage }
                        }}
                    />
                    {/* <View style={[styles.cardContainer, { marginTop: 10 }]}>


                        {!props.isCardFrontImage ?
                            <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 24 }}>{props.cardFront}</Text>
                            :
                            <Image source={{ uri: props.cardFront }} style={{ width: '100%', height: '100%' }} />

                        }



                      



                    </View> */}

                </View>
                :
                <View style={[styles.mainContainer, { ...props.style }]}>
                    <View style={styles.fileContainer}>

                        <Image source={{ uri: props.file }} style={{ width: '100%', height: '100%' }} />
                        <TouchableOpacity
                            onPress={props.onRemovePress}
                            style={[styles.cornerButton, { left: 10, top: 10, backgroundColor: '#00000070' }]}>
                            <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>

                </View>
            }




        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 260,
        height: 200,
        borderRadius: 15



    },
    cardContainer: {

        width: 175,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    fileContainer: {
        width: 150,
        marginRight: 20,
        marginBottom: 20,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
    },



    cornerButton: {
        position: 'absolute',
        alignSelf: 'flex-start',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },




})
export default DeskItemEditPreview