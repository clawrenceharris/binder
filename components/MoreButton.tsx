import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { assets } from '../constants'

interface Props {
    style?: ViewStyle;
    onPress: () => void;
}
const MoreButton: FC<Props> = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[{

                backgroundColor: '#00000030',
                width: 40,
                height: 40,
                borderRadius: 50,
                alignItems: 'center',
                padding: 5,
                justifyContent: 'center'
            }, { ...props.style }]}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />

        </TouchableOpacity>
    )
}

export default MoreButton