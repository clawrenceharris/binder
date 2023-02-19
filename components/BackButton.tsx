import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'

const BackButton = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => { props.onBackPress || props.navigation.goBack() }}>


            <View
                style={{ ...props.style }}>
                {props.direction === 'horizontal' ?
                    <Image
                        source={assets.left_arrow}
                        style={{ width: 24, height: 24, tintColor: props.color || Colors.white, margin: props.margin }}
                    />

                    :
                    <Image
                        source={assets.down_arrow}
                        style={{ width: 45, height: 45, tintColor: props.color, margin: props.margin }}
                    />

                }
            </View>
        </TouchableWithoutFeedback>

    )
}

export default BackButton