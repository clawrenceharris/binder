import { View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Header from '../../components/Header'
import SelectionButton from '../../components/SelectionButton'
import { auth, db, updateCollection } from '../../Firebase/firebase'
import Button from '../../components/Button'
import useColorScheme from '../../hooks/useColorScheme'

const GPASetttings = (props) => {
    const colorScheme = useColorScheme()
    const gpas = ['< 1.7', '1.7 - 2.3', '2.7 - 3.3', '3.3 - 4.0', '> 4.0']
    const [gpa, setGpa] = useState(props.route.params.gpa)
    const [loading, setLoading] = useState(false)

    const onSelect = (item) => {
        if (item === gpa) {
            return setGpa(null)
        }
        setGpa(item);
    }


    const isSelected = (item) => {
        return item === gpa
    }

    const onSavePress = () => {
        setLoading(true)
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({
                gpa
            }).then(() => { 
                setLoading(false); 
                props.navigation.goBack() })
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title={'GPA'}
                navigation={props.navigation}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}

            />

            <View style={styles.mainContainer}>

                <Text numberOfLines={2} style={{ fontFamily: 'KanitMedium', color: Colors.white, marginBottom: 20, fontSize: 16, textAlign: 'center', width: '70%' }}>{"What was your unweighted GPA on your last transcript?"}</Text>
                {/* <View style={{ width: 20, height: 20, borderColor: 'white', borderWidth: 2, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 90, bottom: 5 }}>

                    <Image source={assets.info} style={{ width: 10, height: 10, tintColor: Colors.white, }} />

                </View> */}







                <View style={{ backgroundColor: Colors[colorScheme].background, width: '100%', borderRadius: 25, alignItems: 'center', padding: 20 }}>



                    {gpas.map((gpa, index) =>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { onSelect(gpa) }}
                            key={index}
                            style={{ padding: 20, flexDirection: 'row', marginBottom: 20, width: '50%', ...SHADOWS[colorScheme], shadowRadius: 15, backgroundColor: '#fff', borderRadius: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors[colorScheme].tint, fontFamily: "KanitMedium", fontSize: 16 }}>{gpa}</Text>
                            <SelectionButton
                                onSelect={() => { onSelect(gpa) }}
                                isSelected={isSelected(gpa)}

                            />

                        </TouchableOpacity>

                    )}


                </View>

                {gpa && gpa !== props.route.params.gpa &&
                    <Button
                        title='Save'
                        onPress={onSavePress}
 loading={loading}
                        style={{ width: '100%', marginTop: 30 }}

                    />}

            </View>


        </View>


    )
}

export default GPASetttings