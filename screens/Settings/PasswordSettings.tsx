import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { descriptions, styles } from '.'

const PasswordSettings = ({ route }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Password'}
                style={{ backgroundColor: Colors.primary }}

            />
            <Text style={styles.description}>{descriptions.password}</Text>


        </View>
    )
}

export default PasswordSettings