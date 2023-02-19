import { View, Text, Image } from 'react-native'
import React from 'react'

const CustomImage = (props) => {
    console.log(props.path)
    return (
        <Image source={props.path} resizeMode='contain' style={{ width: 100, height: 100 }} />
    )
}

export default CustomImage