import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { ComponentProps, FC } from 'react'
import { assets, Colors } from '../constants'
import { styles } from '../screens/SignUp';
import useColorScheme from '../hooks/useColorScheme';
import styled from 'styled-components/native';



interface ExtraProps {
  icon?: JSX.Element;
  style?: ViewStyle;
  isClearable?: boolean;
  rightIcon?: JSX.Element;
  value?: string;
  onChangeText?: (value: string) => void;
  onPress?: () => void;
  error?: string;
  containerStyle?: ViewStyle;
  content?: JSX.Element;
}




type Props = TextInputProps & ExtraProps;
const StyledTextInput: FC<Props> = ({ onPress, content, icon, error, style, containerStyle, rightIcon, isClearable, value, onChangeText, ...props }) => {
  const colorScheme = useColorScheme()
  return (
    <View

      style={{ width: '100%', justifyContent: 'center', ...containerStyle }}>

      <View style={{
        position: 'absolute',

        left: 10,
        zIndex: 1,
        paddingRight: 10
      }}>
        {icon}

      </View>



      {!content ? <TextInput
        onPressOut={onPress}
        style={{

          marginLeft: icon && 5,
          fontSize: 20,
          padding: 8,
          backgroundColor: colorScheme === 'light' ? '#FAFAFA50' : '#00000080',
          borderWidth: 1,
          borderColor: !error ? Colors[colorScheme].gray : Colors.red,
          paddingLeft: icon ? 45 : 20,
          paddingRight: isClearable || rightIcon ? 40 : 8,
          fontFamily: 'Kanit',
          color: Colors[colorScheme].tint,
          borderRadius: 25,
          ...style

        }}
        autoCapitalize={'none'}
        spellCheck={false}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colorScheme === 'light' ? '#00000060' : '#ffffff70'}
        selectionColor={Colors.accent}
        {...props} />

        :
        <View style={{
          marginLeft: icon && 5,

          padding: 8,
          backgroundColor: colorScheme === 'light' ? '#FAFAFA50' : '#00000080',
          borderWidth: 1,
          borderColor: !error ? Colors[colorScheme].gray : Colors.red,
          paddingLeft: icon ? 45 : 20,



          borderRadius: 25,
          ...style

        }}>

          {content}
        </View>
      }


      {value?.length > 0 && isClearable &&

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onChangeText('')}
          style={{ padding: 5, backgroundColor: colorScheme === 'light' ? '#C8C8C8' : Colors.dark.veryDarkGray, position: 'absolute', right: 10, top: 15, borderRadius: 50 }}>
          <Image source={assets.close} style={{ width: 8, height: 8, tintColor: Colors.white }} />
        </TouchableOpacity>


      }
      <View


        style={{ position: 'absolute', right: 10 }}>
        {rightIcon}
      </View>


    </View>
  )
}




export default StyledTextInput