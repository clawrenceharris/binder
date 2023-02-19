import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { assets, Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'
import * as ImagePicker from 'expo-image-picker'
import * as Haptics from 'expo-haptics'
import CameraButton from '../components/CameraButton'
import { haptics } from '../utils'
import { auth, db } from '../Firebase/firebase'

const MAX_VIDEO_DURATION = 10000

const CameraScreen = ({ route, navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isRecording, setIsRecording] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(false)
    const cameraRef = useRef(null)
    const [galleryItems, setGalleryItems] = useState([])
    const [lastTap, setLastTap] = useState(null);
    const [canTakePicture, setCanTakePicture] = useState(true)
    const [user, setUser] = useState(null)
    const chatroom = route?.params?.chatroom || null
    const canRecord = route?.params?.canRecord || true
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            console.log(type)
            if (type == Camera.Constants.Type.back) {
                setType(Camera.Constants.Type.front)

            }
            if (type == Camera.Constants.Type.front) {
                setType(Camera.Constants.Type.back)
                haptics('light')
            }
        } else {
            setLastTap(now);
        }
    }

    const onFlipPressed = () => {
        if (type == Camera.Constants.Type.back) {
            setType(Camera.Constants.Type.front)
            haptics('light')
        }
        if (type == Camera.Constants.Type.front) {
            setType(Camera.Constants.Type.back)
            haptics('light')
        }
    }

    useEffect(() => {

        (async () => {

            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')

            if (galleryStatus.status === 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['photo', 'video'] })
                setGalleryItems(userGalleryMedia.assets)
            }


        })();

        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {

                setUser(doc.data())
            })
        return () => subscriber()
    }, [])
    const recordVideo = async () => {
        setCanTakePicture(false)
        setIsRecording(true)
        if (cameraRef) {
            try {
                const options = { maxDuration: MAX_VIDEO_DURATION, quality: Camera.Constants.VideoQuality['480'] }
                const videoRecordPromise = cameraRef.current.recordAsync(options)
                setIsRecording(true)
                if (videoRecordPromise) {
                    setIsRecording(false)

                    const data = await videoRecordPromise;
                    setVideo(data.uri)
                    route?.params.setVideo(result.uri)
                    navigation.goBack()

                }
            } catch (e) {
                console.warn(e)
            }
        }


    }

    const stopRecording = () => {
        if (cameraRef) {

            cameraRef.current.stopRecording()


        }
    }
    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

                route?.params.setImage(data.uri)
                navigation.goBack()

            } catch (e) {
                console.log(e)
            }
        }
    }





    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspectRatio: [16, 9],
            selectionLimit: 3
        });

        if (!result.cancelled && result != null) {
            if (result.type == 'video') {
                route?.params.setVideo(result.uri)
                navigation.goBack()


            }

            else if (result != null && result.type == 'image') {
                route?.params.setImage(result.uri)
                navigation.goBack()

            }
        }

    }

    return (

        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.container}
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => {
                    setIsRecording(false);
                    stopRecording();
                    if (canTakePicture && !video) {
                        takePicture()
                    }
                }}
                onResponderGrant={handleDoubleTap}>


                {/* {!hasCameraPermission && <ModalComponent toValue={-1300} height={330} open={openCameraModal} renderContent={(
                <View>
                    <View style={{ borderBottomColor: Colors[colorScheme].tint, borderBottomWidth: 1, padding: 10 }}>
                        <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16, textAlign: 'center' }}>Uh oh!</Text>
                    </View>
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, textAlign: 'center', marginTop: 20 }}>Binder needs acces to your camera. Allow access in Settings to start taking pics!</Text>
                    <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].tint, borderRadius: 50, padding: 10, marginTop: 30 }} onPress={() => { Linking.openSettings() }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].background, textAlign: 'center', fontSize: 16 }}>Allow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].tint, borderRadius: 50, padding: 10, marginTop: 30 }} onPress={() => { setOpenCameraModal(false) }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].background, textAlign: 'center', fontSize: 16 }}>Don't Allow</Text>
                    </TouchableOpacity>
                </View>
            )} />} */}


                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flashMode}
                    ref={cameraRef}
                    ratio={'16:9'}


                />







                {chatroom && <View style={styles.sendToContainer}>
                    {chatRoom.type === 'private' && <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 18 }}>Send to {chatRoom.users[0].displayName}</Text>}
                    {chatRoom.type === 'group' && <Text style={{ position: 'absolute', fontSize: 16, fontFamily: 'Kanit', color: 'white' }}></Text>}

                </View>}

                {/* <View style={styles.topContainer}>






                    <TouchableOpacity onPress={() => { setFlashMode(!flashMode) }}>
                        <View>
                            {!flashMode && <Image source={assets.flash_off} style={styles.icon} />}
                            {flashMode && <Image source={assets.flash} style={[styles.icon, { tintColor: 'white' }]} />}

                        </View>


                    </TouchableOpacity>

                </View> */}

                <View style={styles.bottomContianer}>

                    {!isRecording &&

                        <TouchableOpacity
                            style={styles.galleryButton}
                            onPress={pickFromGallery}
                        >
                            {galleryItems[0] == undefined
                                ?
                                <></>
                                :
                                <Image source={{ uri: galleryItems[0].uri }} style={styles.galleryButtonImage} />
                            }
                        </TouchableOpacity>}







                    <TouchableOpacity
                        onLongPress={canRecord && recordVideo}
                        delayLongPress={500}
                        onPress={takePicture}
                    >


                        <CameraButton maxDuration={MAX_VIDEO_DURATION} isRecording={isRecording} />
                    </TouchableOpacity>



                    {!isRecording &&
                        <TouchableOpacity onPress={onFlipPressed}>
                            <Image source={assets.desk} style={[styles.icon, { width: 35, height: 35 }]} />
                        </TouchableOpacity>}




                </View>
            </View>
        </View >

    );


}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    camera: {
        width: '100%',
        height: '100%',
        flex: 1,
        aspectRatio: 9 / 16,

    },

    cameraButtonContainer: {


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

    },
    sendToContainer: {
        // backgroundColor: '#00000086',
        position: 'absolute',
        top: 40,
        height: 45,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        ...SHADOWS.medium

    },

    bottomContianer: {
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 20,
        width: '100%',
        padding: 20
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
        overflow: 'hidden',
        marginRight: 5

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
export default CameraScreen