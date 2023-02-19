import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import Header from '../../components/Header'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import { auth, db, updateCollection } from '../../Firebase/firebase'
import Input from '../../components/StyledTextInput'
const BirthdaySettings = (props) => {
    const { value } = props.route.params
    const [month, setMonth] = useState('')
    const [day, setDay] = useState(value.day)
    const [year, setYear] = useState(value)
    const [loading, setLoading] = useState(false)
    const isValidDay = (data) => {
        if (+data >= 1 && +data <= 31) {
            return true
        }
        return false
    }

    const isValidMonth = (data) => {
        if (+data >= 1 && +data <= 12) {
            return true
        }
        return false
    }

    const isValidYear = (data) => {
        if (+data >= 1898 && +data <= 2011) {
            return true
        }
        return false
    }

    const onSavePress = () => {

        const birthday = new Date(+year, +month - 1, +day)
        setLoading(true)
        db.collection('users')
            .doc(auth.currentUser.uid)
            .update({
                birthday
            }).then(() => {
                setLoading(false);
                props.navigation.goBack();
            })

    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title='Birthday'
                navigation={props.navigation}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}

            />
            <View style={{ padding: 20 }}>
                <Text style={styles.description}>{descriptions.birthday}</Text>

                <View style={styles.birthdayInputContainer}>


                    <View style={{ width: '25%' }}>
                        <Input
                            placeholder='MM'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={month}
                            onChangeText={setMonth}


                        />

                    </View>

                    <View style={{ width: '25%', marginLeft: 15 }}>
                        <Input
                            placeholder='DD'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}


                        />

                    </View>

                    <View style={{ width: '40%', marginLeft: 15 }}>
                        <Input
                            placeholder='YYYY'
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType={'number-pad'}


                        />

                    </View>



                </View>
                <Text style={styles.finePrint}>{"You must be at least 12 years old to use Binder"}</Text>

                {isValidMonth(month) && isValidDay(day) && isValidYear(year) &&
                    <Button
                        title={'Save'}
                        style={{ margin: 20, width: '100%' }}
                        onPress={onSavePress}
                        loading={loading}

                    />}
            </View>








        </View>
    )
}

export default BirthdaySettings