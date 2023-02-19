import { View, Text, TextInput, TouchableOpacity, Animated, Modal, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { auth, db, updateCollection, updateUserProfile } from '../Firebase/firebase';
import { Colors } from '../constants';
import { styles } from '../screens/SignUp';
import Button from './Button';
import { getDisplayName } from '../utils';

const NotificationDrop = (props) => {

  const { width, height } = useWindowDimensions()
  const translateValue = useRef(new Animated.Value(0)).current

  function slideIn() {
    Animated.timing(
      translateValue,
      {

        toValue: 400,
        duration: 300,
        useNativeDriver: true,

      }).start();
  }




  function slideOut() {
    Animated.timing(
      translateValue,
      {

        toValue: 900,
        duration: 500,
        useNativeDriver: true,

      }).start();
  }


  return (


    <View style={{ width: '100%', height: '100%' }}>

      <Animated.View style={{ position: 'absolute', top: 0, backgroundColor: Colors.light.primary, alignItems: 'center', borderColor: 'gray', borderWidth: 1, alignSelf: 'center', height: 60, width: width, marginBottom: height, borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Kanit' }}>{props.message}</Text>
      </Animated.View>

    </View>


  )
}

export default NotificationDrop