import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ViewStyle } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { Class, School } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ProfileButton from './ProfileButton'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { assets } from '../constants'
import SelectionButton from './SelectionButton'
import { auth } from '../Firebase/firebase'
import ScaleButton from './ScaleButton'


interface Props {
    onPress?: () => void;
    onLongPress?: () => void;
    item: object;
    isSelected?: boolean;
    type: 'school' | 'class'
    isSelectable?: boolean;
    isBottom?: boolean;
    isTop?: boolean
    style?: ViewStyle;
    onProfileButtonPress: () => void
    users: object[]
    activity: object[]
}

const ClassSchoolListItem: FC<Props> = (props) => {
    const colorScheme = useColorScheme()

    return (
        <View>



            {props.isSelectable ?
                <TouchableOpacity
                    onPress={props.onPress}
                    style={[styles.container, {
                        borderTopRightRadius: props.isSelectable && props.isTop && 15,
                        borderTopLeftRadius: props.isSelectable && props.isTop && 15,
                        borderBottomLeftRadius: props.isSelectable && props.isBottom && 15,
                        borderBottomWidth: !props.isBottom && 1,
                        borderBottomRightRadius: props.isSelectable && props.isBottom && 15,
                        borderBottomColor: Colors[colorScheme].gray,


                        backgroundColor: colorScheme === 'light' ? Colors.white : Colors.light.tint,

                        ...props.style
                    }]}
                >

                    <ProfileButton
                        defaultImage={props.type === 'class' ? assets.book : assets.school}
                        onPress={props.onProfileButtonPress}
                        imageURL={props.item?.photoURL}
                        size={40}
                    />


                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.className, { color: props.type === 'class' ? Colors.primary : Colors.accent }]}>{props.item?.name}</Text>

                        {!props.isSelectable &&
                            <ActivePeople userCount={props.item?.users?.length} activeCount={props.item?.active?.length} />
                        }
                    </View>
                    {props.isSelectable &&
                        <SelectionButton
                            style={{ position: 'absolute', right: 10 }}
                            isSelected={props.isSelected}
                            onSelect={props.onPress}

                        />
                    }

                </TouchableOpacity>
                :

                <ScaleButton
                    toValue={1.07}
                    disabled={props.isSelectable}
                    onLongPress={!props.isSelectable && props.onLongPress}
                    onPress={props.onPress}
                >
                    <View style={{ ...props.style, width: '90%' }}>


                        <View style={[styles.headerContainer, { backgroundColor: Colors[colorScheme].invertedTint, ...SHADOWS[colorScheme], zIndex: 1 }]}>
                            <ProfileButton
                                defaultImage={props.type === 'class' ? assets.book : assets.school}
                                onPress={props.onProfileButtonPress}
                                imageURL={props.item?.photoURL}
                                size={40}


                            />
                            <Text style={[styles.className, { color: props.type === 'class' ? Colors.primary : Colors.accent }]}>{props.item.name}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                {props?.item.users?.filter(user => user.uid != auth.currentUser.uid)?.map(user => (
                                    <ProfileButton

                                        imageURL={user.photoURL}
                                        defaultImage={assets.person}

                                    />
                                ))}
                            </View>
                        </View>

                        <View style={[styles.bottomContainer, { backgroundColor: colorScheme === 'light' ? Colors.light.lightGray : Colors.light.tint + '90' }]}>
                            <Text style={{ color: Colors[colorScheme].darkGray, fontFamily: 'KanitMedium', alignSelf: 'center' }}>No Recent Activity</Text>

                        </View>
                    </View>
                </ScaleButton>
            }
        </View>

    )
}
const styles = StyleSheet.create({

    bottomContainer: {
        padding: 10,

        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerContainer: {
        padding: 10,

        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'row',

        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit',
        marginLeft: 10
    },


})
export default ClassSchoolListItem