import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { assets, Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
interface Props {
    isImage: boolean;
    value: string;
    isFront: boolean;
    onChangeText: (value: string) => void;
    onRemovePress: () => void;
}
const EditFlashcard: FC<Props> = (props) => {
    const colorScheme = useColorScheme();
    return (
        <View>
            {!props.isImage ?  //if the back of the card is not an image the render text input card

                <View style={styles.cardContainerRight}>

                    <TextInput
                        style={[styles.cardInput, { color: Colors[colorScheme].tint }]}
                        placeholder={props.isFront ? "Term" : 'Definition'}
                        value={props.value}
                        multiline
                        numberOfLines={10}
                        onChangeText={(value) => props.onChangeText(value)}


                        placeholderTextColor={'darkgray'}
                        selectionColor={Colors.accent}


                    />
                    <TouchableOpacity
                        onPress={() => {




                        }}
                        style={styles.cornerButton}>
                        <Image source={assets.add_image} style={{ width: 15, height: 15, tintColor: 'white' }} />
                    </TouchableOpacity>

                </View>
                ://otherwise render the image
                <View style={styles.cardContainerRight}>

                    <Image source={{ uri: props.value }} style={{ width: '100%', height: '100%' }} />
                    <TouchableOpacity
                        onPress={props.onRemovePress}
                        style={styles.cornerButton}>
                        <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                    </TouchableOpacity>

                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainerRight: {

        width: 175,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    cardContainerLeft: {
        width: 175,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    imageContainer: {
        marginRight: 20,
        width: 150,
        height: 150,
        backgroundColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },




    cornerButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#00000060',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardInput: {
        flexDirection: 'row',
        fontFamily: 'Kanit',
        fontSize: 16,
        padding: 5
    }




})
export default EditFlashcard