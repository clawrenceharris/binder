import { View, TouchableOpacity, StyleSheet, ViewStyle, Image } from 'react-native'
import React, { FC } from 'react'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'

interface Props {
    isSelected: boolean;
    activeOpacity?: number;
    color?: string;
    onSelect: () => void;
    style?: ViewStyle;
}

const SelectionButton: FC<Props> = (props) => {
    const colorScheme = useColorScheme()


    const styles = StyleSheet.create({
        selectionBtn: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 20,
            height: 20,
            borderRadius: 100,
            backgroundColor: props.isSelected ? props.color || Colors.accent : 'transparent'
        },
        selectionBtnContainer: {
            backgroundColor: props.isSelected ? props.color || Colors.accent : 'transparent',
            borderWidth: 1.5,
            borderColor: props.isSelected ? 'transparent' : Colors[colorScheme].gray,
            borderRadius: 50,
            padding: 5
        }
    })
    return (

        <TouchableOpacity
            onPress={props.onSelect}
            style={[styles.selectionBtnContainer, { ...props.style }]}
            activeOpacity={props.activeOpacity}>
            <View style={styles.selectionBtn}>
                {props.isSelected && <Image source={assets.check} style={{ width: 15, height: 15, tintColor: Colors.white }} />}
            </View>

        </TouchableOpacity>

    )

}

export default SelectionButton

