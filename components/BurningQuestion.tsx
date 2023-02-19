import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { BurningQuestion as BurningQuestionType } from '../types'
import useColorScheme from '../hooks/useColorScheme';
import { Colors } from '../constants';
import { SHADOWS } from '../constants/Theme';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
    burningQuestion: BurningQuestionType;
    size?: number;

}
const BurningQuestion: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    return (
        // <View style={{ backgroundColor: Colors[colorScheme].invertedTint, padding: 20, width: props.size || 250, borderRadius: 20, ...SHADOWS[colorScheme] }}>
        //     <Text style={{ textAlign: 'center', fontFamily: 'KanitMedium', fontSize: 18, color: Colors[colorScheme].tint }}>{props.burningQuestion.title}</Text>
        //     <Text style={{ fontFamily: 'Kanit', fontSize: 14, color: Colors[colorScheme].darkGray }}>{props.burningQuestion.question}</Text>

        // </View>
        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center' }}
        >
        </LinearGradient>
    )
}

export default BurningQuestion