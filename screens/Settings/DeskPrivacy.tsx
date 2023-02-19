import { View, Text } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/Theme'
import BackButton from '../../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { Colors } from '../../constants'


const DeskPrivacy = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title={'Desk Privacy'}
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}

            />
            <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}></Text>


        </View>
    )
}

export default DeskPrivacy