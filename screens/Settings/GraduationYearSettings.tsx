import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { SHADOWS, SIZES } from '../../constants/Theme'
import BackButton from '../../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Header from '../../components/Header'
import SelectionButton from '../../components/SelectionButton'
import ToggleButton from '../../components/ToggleButton'
import { Colors } from '../../constants'
import Button from '../../components/Button'
import { auth, db, updateCollection } from '../../Firebase/firebase'
import useColorScheme from '../../hooks/useColorScheme'

const GraduationYearSettings = (props) => {
    const year = new Date().getFullYear();
    const years = [year, year + 1, year + 2, year + 3, "Other"]
    const [selectedYear, setSelectedYear] = useState(null)
    const colorScheme = useColorScheme()
    const [loading, setLoading] = useState(false)



    const onSelect = (year) => {

        if (selectedYear === year) {
            return setSelectedYear(null)
        }
        setSelectedYear(year);
    }

    const onSavePress = () => {
        setLoading(true)
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({
                gradYear: selectedYear

            }).then(() => {
                setLoading(false);
                props.navigation.goBack();
            })
    }

    const isSelected = (year) => {
        return year === selectedYear
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title={'Graduation Year'}
                style={{ backgroundColor: Colors.primary }}
                navigation={props.navigation}
                color={Colors.white}

            />
            <View style={[styles.mainContainer, { padding: 20 }]} >

                <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 10 }}>{"When do you expect graduate?"}</Text>



                <View style={{ backgroundColor: Colors[colorScheme].background, width: '100%', borderRadius: 25, alignItems: 'center', padding: 20 }}>


                    {years.map((year, index) =>
                        <TouchableOpacity
                            onPress={() => { onSelect(year) }}
                            key={index.toString()}
                            activeOpacity={0.8}
                            style={{ flexDirection: 'row', marginBottom: 22, padding: 15, width: '100%', backgroundColor: '#fff', ...SHADOWS[colorScheme], shadowRadius: 15, borderRadius: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors[colorScheme].tint, fontFamily: "KanitMedium", fontSize: 16 }}>{year}</Text>
                            <SelectionButton
                                onSelect={() => { onSelect(year) }}
                                isSelected={isSelected(year)}
                                activeOpacity={1}

                            />

                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.description}>{"We'll use this to match you with study buddies."}</Text>


                {selectedYear && selectedYear != props.route.params.gradYear &&
                    <Button
                        title={'Save'}
                        style={{ margin: 20, width: '100%' }}
                        onPress={onSavePress}
                        loading={loading}

                    />}
            </View >









        </View >
    )
}

export default GraduationYearSettings