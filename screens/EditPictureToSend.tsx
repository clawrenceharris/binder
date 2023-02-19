import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { updateLocale } from 'moment'
import Animated from 'react-native-reanimated'
import { SHADOWS } from '../constants/Theme'
//import { SliderColorPicker } from '../components/SliderColorPicker'



const EditPictureToSend = ({ route }) => {
    const image = route.params.image
    const navigation = useNavigation()
    const [textBackgroundColor, setTextBackgroundColor] = useState('transparent')
    const [textInputHeight, setTextInputHeight] = useState('100%')
    const [textTop, setTextTop] = useState(0)
    const [value, onChangeText] = useState('')
    const [fontSize, setfontSize] = useState()
    const [textComponent, setTextComponent] = useState(<></>)
    const [bigFont, setBigFont] = useState(false)
    const [textAlign, setTextAlign] = useState('flex-start')
    console.log(value)
    const textStyles =


    {
        regular:
        {
            fontSize: 18,
            color: 'white',
            height: 40,
            width: '100%',
            backgroundColor: '#00000090',
            position: 'absolute',
            top: '50%',
            padding: 10,
            textAlign: 'center'

        },

        big:
        {
            fontSize: 46,
            color: 'white',
            width: '100%',
            position: 'absolute',
            top: '50%',
            textAlign: 'center',
            fontFamily: 'KanitBold'

        }
    }
    const [textStyle, setTextStyle] = useState(textStyles.regular)




    const handleFocus = () => {
        setTextBackgroundColor('#00000090');
        setTextInputHeight(40)
        setTextTop('50%')
        setfontSize(18)

    }



    const setText = () => {
        if (textComponent != <></>) {
            setTextComponent(
                <TextInput style={textStyle} autoFocus onSubmitEditing={() => { console.log('Done'); }} onChangeText={text => onChangeText(text)} />)
        }
    }





    const handleTextSubmit = () => {

    }
    const onSendPress = async () => {
        navigation.navigate('ChatRoom', { class: route.params.class, chatRoom: route.params.chatRoom })
    }


    const onCancelPress = () => {
        navigation.goBack()

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>

            <TouchableWithoutFeedback onPress={setText}>
                <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 20 }} resizeMode='contain' />


            </TouchableWithoutFeedback>
            {/* <SliderColorPicker /> */}
            <KeyboardAvoidingView style={{ flexDirection: 'row', padding: 10, position: 'absolute', width: '100%', height: 60, backgroundColor: '#00000000', top: '10%' }}>
                {!bigFont && <TouchableWithoutFeedback onPress={() => { setBigFont(true); setTextStyle(textStyles.big); setText() }} >
                    <View style={{ width: 35, height: 35, borderColor: 'white', borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', ...SHADOWS.dark }}>
                        <Image source={assets.font} style={{ width: 28, height: 28, tintColor: 'white' }} />

                    </View>

                </TouchableWithoutFeedback>}
                {bigFont && <TouchableWithoutFeedback onPress={() => { setBigFont(false); setTextStyle(textStyles.regular); setText() }}>
                    <View style={{ width: 35, height: 35, borderColor: 'white', backgroundColor: 'white', borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={assets.font} style={{ width: 28, height: 28, tintColor: 'black' }} />

                    </View>

                </TouchableWithoutFeedback>}



            </KeyboardAvoidingView>
            {textComponent}


            <View style={{ backgroundColor: 'black', justifyContent: 'space-between', padding: 10, flexDirection: 'row' }} >

                <TouchableOpacity onPressOut={onCancelPress} style={{ width: 100, height: 50, backgroundColor: '#2D2D2D', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 16 }}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={onSendPress} style={{ alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: '#8C3BD7', flexDirection: 'row', borderRadius: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, height: 50 }}>

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

export default EditPictureToSend