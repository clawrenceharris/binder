import { View, Text, TextInput, TouchableOpacity, Animated, Modal, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '../constants';
import Button from './Button';
import useColorScheme from '../hooks/useColorScheme';

const EditNameModal = (props) => {

    const [name, setName] = useState(props.name)
    const { width, height } = useWindowDimensions()
    const translateValue = useRef(new Animated.Value(0)).current
    const colorScheme = useColorScheme()
    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: -700,
                duration: 300,
                useNativeDriver: true,

            }).start();
    }




    function slideOut() {
        Animated.timing(
            translateValue,
            {

                toValue: 900,
                duration: 500,
                useNativeDriver: true,

            }).start();
    }


    return (
        <Modal
            transparent
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}
        >

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center' }} >


                <Animated.View style={{ alignSelf: 'center', height: 360, backgroundColor: Colors[colorScheme].background, width: 300, marginTop: height, borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, flex: 1 }}>
                        <Text style={{ color: Colors[colorScheme].tint, fontSize: 18, fontFamily: 'Kanit' }}>{"Edit Name"}</Text>
                        <Text style={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center', marginTop: 20 }}>{"This is how you appear and how people can find you on Binder, so choose a name your classmates know you by."}</Text>


                        <View style={{ margin: 20, width: '100%' }}>

                            <TextInput
                                placeholder='Name'
                                style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, padding: 15, fontSize: 18, paddingHorizontal: 10, width: '100%', backgroundColor: '#00000010', borderRadius: 10, borderTopRightRadius: 10 }}
                                onChangeText={setName}
                                value={name}
                                autoFocus
                                placeholderTextColor={'#00000040'}
                                selectionColor={Colors.accent}

                            />


                        </View>


                        <Button
                            title={'Save'}
                            disabled={!name}
                            style={{ width: '100%' }}
                            onPress={() => props.onSavePress(name)}



                        />

                        <TouchableOpacity onPress={() => { setName(''); props.onCancelPress(); }}>
                            <Text style={{ color: Colors[colorScheme].tint, fontFamily: "Kanit", marginTop: 20, letterSpacing: 3 }}>{"CANCEL"}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal >

    )
}

export default EditNameModal