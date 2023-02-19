import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, ImageSourcePropType } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import ProfileButton from './ProfileButton'
import { db } from '../Firebase/firebase'
import SelectionButton from './SelectionButton'
import { Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { ActivityBadge } from './ProfileBadges'
import { User } from '../types'



interface Props {
    onProfileButtonPress?: () => void
    onPress: () => void
    onSelect?: () => void;
    user: User
    isSelected?: boolean;
    isTop?: boolean;
    isBottom?: boolean;
    type: 'selectable' | 'default' | 'add study buddy' | 'add friend'
    icon?: ImageSourcePropType


}
const UserListItem: FC<Props> = (props) => {

    const colorScheme = useColorScheme()
    const styles = StyleSheet.create({
        mainContainer: {
            borderTopRightRadius: props.isTop && 15,
            borderTopLeftRadius: props.isTop && 15,
            borderBottomLeftRadius: props.isBottom && 15,
            borderBottomWidth: !props.isBottom && 1,
            borderBottomRightRadius: props.isBottom && 15,
            padding: 15,
            backgroundColor: Colors[colorScheme].invertedTint,
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
            borderBottomColor: Colors[colorScheme].gray,


        }
    })




    return (

        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ProfileButton
                        size={45}
                        imageURL={props.user.photoURL || null}
                        onPress={props.onProfileButtonPress}

                    />
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, marginLeft: 10, fontSize: 18 }}>{props.user?.displayName}</Text>
                </View>
                {props.type === 'selectable' &&
                    <SelectionButton
                        onSelect={props.onSelect}
                        isSelected={props.isSelected}
                    />
                }

                {props.type === 'add friend' &&
                    <View>
                        <Text>{"Add Friend"}</Text>

                    </View>
                }

                {props.type === 'add study buddy' && !props.isSelected &&
                    <TouchableOpacity
                        onPress={props.onSelect}
                        style={{ backgroundColor: Colors.yellow, borderRadius: 25, padding: 4, paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors.light.tint }}>{"🤓 Add"}</Text>

                    </TouchableOpacity>
                }

                {props.type === 'add study buddy' && props.isSelected &&
                    <View style={{ backgroundColor: Colors[colorScheme].gray, borderRadius: 25, padding: 4, paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors.yellow }}>{"🤓 Added!"}</Text>

                    </View>
                }


            </View>




        </TouchableWithoutFeedback>

    )
}






export default UserListItem