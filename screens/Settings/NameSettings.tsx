import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { descriptions, styles } from '.'
import { auth, db, updateCollection, updateUserProfile } from '../../Firebase/firebase'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Input from '../../components/StyledTextInput'

const NameSettings = (props) => {

    const [displayName, setDisplayName] = useState(props.route.params.displayName || '')
    const [loading, setLoading] = useState(false)
    const onSavePress = () => {
        setLoading(true)

        db.collection("users").doc(auth.currentUser.uid).update({
            displayName
        }).then((function () {
            setLoading(false)
            props.navigation.goBack();
        }))

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


            <View style={{ flex: 1, backgroundColor: Colors.primary }}>
                <Header
                    navigation={props.navigation}
                    direction={'horizontal'}
                    title={'Name'}
                    style={{ backgroundColor: Colors.primary }}
                    color={Colors.white}

                />
                <View style={styles.mainContainer}>

                    <Text style={styles.description}>{descriptions.name}</Text>


                    <View style={{ width: '100%', marginTop: 30 }}>
                        <Input
                            placeholder='Name'
                            style={{ backgroundColor: '#00000070', color: Colors.white }}
                            value={displayName}
                            onChangeText={setDisplayName}

                        />
                    </View>





                    {displayName.trim() !== props.route.params.displayName && displayName.trim() &&

                        <Button
                            title={'Save'}
                            style={{ margin: 30, width: '100%' }}

                            onPress={onSavePress}
                            loading={loading}
                        />}



                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default NameSettings