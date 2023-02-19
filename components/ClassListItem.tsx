import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, ViewStyle, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ProfileButton from './ProfileButton'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { auth, db, updateCollection } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import { assets } from '../constants'
import { Class } from '../types'
import SelectionButton from './SelectionButton'


interface Props {
    onPress?: () => void
    Class: Class
    onLongPress?: () => void
    type: 'selectable' | undefined
    isSelected?: boolean
    onSelect?: () => void
    style?: ViewStyle
    isTop?: boolean;
    isBottom?: boolean;

}
const ClassListItem: FC<Props> = (props) => {
    const colorScheme = useColorScheme()


    return (





        <View>


            {props.type === 'selectable' ?
                <TouchableOpacity
                    activeOpacity={props.type === 'selectable' && 1}
                    style={[styles.container, {
                        borderTopRightRadius: props.type === 'selectable' && props.isTop && 15,
                        borderTopLeftRadius: props.type === 'selectable' && props.isTop && 15,
                        borderBottomLeftRadius: props.type === 'selectable' && props.isBottom && 15,
                        borderBottomWidth: !props.isBottom && 1,
                        borderBottomRightRadius: props.type === 'selectable' && props.isBottom && 15,
                        borderBottomColor: Colors[colorScheme].gray,


                        backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint,

                        ...props.style
                    }]}
                    onPress={props.type === 'selectable' && props.onSelect}
                >

                    <ProfileButton
                        defaultImage={assets.book}
                        onPress={props.onPress}
                        size={40}
                    />


                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.className, { color: Colors.primary }]}>{props.Class?.name}</Text>




                    </View>
                    {props.type === 'selectable' &&
                        <SelectionButton
                            style={{ position: 'absolute', right: 10 }}
                            isSelected={props.isSelected}
                            onSelect={props.onSelect}

                        />
                    }

                </TouchableOpacity>

                :
                <></>
            }

        </View>










    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },


    selected: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: Colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },


    addButtonContainer: {
        alignSelf: 'flex-end',
        padding: 8,
        width: 60,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 50,


    },


    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit',

        width: '100%'



    }
})
export default ClassListItem