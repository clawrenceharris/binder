import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, Platform, Switch, Alert } from 'react-native'
import React, { useState } from 'react'
import useColorScheme from '../../hooks/useColorScheme'
import { assets, Colors } from '../../constants'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import Header from '../../components/Header'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import StyledTextInput from '../../components/StyledTextInput'

const SignUpBirthday = (props) => {

    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    const [date, setDate] = useState(null)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const colorScheme = useColorScheme()

    const [disabled, setDisabled] = useState(false)
    const onNextPressed = () => {

        if (isValidYear(date.getFullYear())) {
            props.navigation.navigate('SignUpUsername', { ...props.route.params, birthday: date })

        }
        else {
            setError('You are too young to use Binder.')
        }
    }


    const isValidYear = (year) => {
        if (year >= 1898 && year <= 2011) {
            return true
        }
        return false
    }

    const onChange = (event, selectedDate) => {
        setError('')
        if (event.type === 'neutralButtonPressed') {
            setDate(new Date(0));
        } else {
            setDate(selectedDate);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}>
            <Header navigation={props.navigation} />
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, fontSize: 18 }}>{"Hey, " + props.route.params.displayName + "!"}</Text>
                <Text style={[styles.screenTitle, { color: Colors[colorScheme].tint }]}>{" When's your birthday?"}</Text>
                <Text style={[styles.description, { color: Colors[colorScheme].darkGray, marginBottom: 30 }]}>{descriptions.birthday}</Text>

                <StyledTextInput
                    error={error}

                    isClearable
                    placeholder='Birthday'
                    keyboardType={'number-pad'}
                    onChangeText={(value) => { setDate(value); setError('') }}
                    value={date ? moment(date).format('MMMM DD, YYYY') : ''}
                    editable={false}
                    icon={<Text>🎂</Text>}

                />
                <Text style={[styles.errorMessage, { alignSelf: 'flex-start' }]}>{error}</Text>
            </View>
            <View style={{ bottom: 20, position: 'absolute', width: '100%' }}>


                <Button
                    title={'Next'}
                    onPress={onNextPressed}
                    style={{ width: '50%', marginBottom: 20 }}
                    disabled={!date}
                />



                <DateTimePicker
                    testID="dateTimePicker"
                    display='spinner'
                    maximumDate={new Date((new Date().getFullYear() + 1).toString())}
                    minimumDate={new Date('1920')}
                    value={date || new Date()}
                    textColor={Colors[colorScheme].tint}
                    accentColor={Colors.accent}
                    onChange={onChange}
                    disabled={disabled}

                />
            </View>
        </View>
    )
}



export default SignUpBirthday

