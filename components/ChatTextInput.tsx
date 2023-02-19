import { View, Text, TextInputProps } from 'react-native'
import React, { useEffect, useState } from 'react'

interface ChatTextInputProps {

}

type InputProps = TextInputProps & ChatTextInputProps

const ChatTextInput = (props) => {
    const [value, setValue] = useState('')
    useEffect(() => {
        setValue(props.value)
        props.onChangeText()
    }, [])

    return (
        <Text>
            {props.value}
        </Text>

    )
}

export default ChatTextInput