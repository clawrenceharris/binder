import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { Video } from 'expo-av'

const EditVideoToSend = ({ route }) => {
    const navigation = useNavigation()
    const video = route.params.video
    console.log(video)
    const onSendPress = async () => {
        navigation.navigate('ChatRoom', { class: route.params.class, chatRoom: route.params.chatRoom })
    }


    const onCancelPress = () => {
        console.log("GO back")
        navigation.goBack()

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Video source={{ uri: video }} style={{ flex: 1, borderRadius: 25, margin: 10 }} shouldPlay isLooping />

            <View style={{ backgroundColor: 'black', justifyContent: 'space-between', padding: 20, flexDirection: 'row' }} >

                <TouchableOpacity onPress={onCancelPress} style={{ width: 100, height: 50, backgroundColor: '#2D2D2D', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 16 }}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSendPress} style={{ alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: Colors.light.primary, flexDirection: 'row', borderRadius: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, height: 50 }}>

                        {route.params.chatRoom.type === 'private' && <Image source={route.params.chatRoom.users[0].images[0]} style={{ width: 40, height: 40 }} />}
                        <Image source={assets.send} style={styles.send} />


                    </View>



                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        aspectRatio: 9 / 16,

    },

    cameraButtonContainer: {
        flex: 1,

    },
    cameraButton: {
        borderColor: '#ffffff4D',
        borderWidth: 10,
        width: 90,
        height: 90,
        borderRadius: 50,
        bottom: '5%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },


    image: {
        width: '100%',
        height: '100%'
    },

    icon: {
        width: 28,
        height: 28,
        tintColor: 'white',
        margin: 20,

    },


    bottomContianer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: '10%',
        paddingVertical: 50,
        alignItems: 'center',

    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 45,
        width: '100%'
    },

    send: {
        width: 35,
        height: 35,
        tintColor: 'white',
        marginLeft: 10
    },

    sendToText: {
        zIndex: 1,



    },

    galleryButton: {
        width: 38,
        height: 38,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginLeft: 60,
        overflow: 'hidden'

    },

    galleryButtonImage: {
        width: 38,
        height: 38,
    },
    sideBarContainer: {
        top: 60,
        marginHorizontal: 20,
        right: 0,
        position: 'absolute'
    }


})
export default EditVideoToSend