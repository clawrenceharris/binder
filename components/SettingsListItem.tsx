import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { SHADOWS } from '../constants/Theme'
import useColorScheme from '../hooks/useColorScheme'

const SettingsListItem = ({ title, value, onPress, titleColor, valueColor, isTop, isBottom }) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint,
            borderTopLeftRadius: isTop ? 15 : 0,
            borderTopRightRadius: isTop ? 15 : 0,
            borderBottomLeftRadius: isBottom ? 15 : 0,
            borderBottomRightRadius: isBottom ? 15 : 0,
            flexDirection: 'row',
            padding: 20,
            borderBottomColor: Colors[colorScheme].gray,
            borderBottomWidth: !isBottom && 1,
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })
    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View>
                <View style={styles.mainContainer}>
                    <Text style={{ color: titleColor || Colors[colorScheme].tint, fontFamily: 'Kanit', fontSize: 16 }}>{title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'gray', fontFamily: 'KanitMedium' }}>{value}</Text>
                        <Image source={assets.right_arrow} style={{ width: 20, height: 20, tintColor: 'gray', marginLeft: 10 }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>


    )
}

export default SettingsListItem