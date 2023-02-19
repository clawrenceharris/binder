import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, TextStyle, ViewStyle, Image } from 'react-native'
import React, { FC } from 'react'
import BackButton from './BackButton'
import { SHADOWS, SIZES } from '../constants/Theme'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { NavigationProp, useNavigation } from '@react-navigation/native'



interface Props {
    onBackPress?: () => void;
    textStyle?: TextStyle;
    color?: string;
    direction?: 'horizontal' | 'vertical';
    headerRight?: JSX.Element;
    headerLeft?: JSX.Element;
    headerCenter?: JSX.Element;
    isModal?: boolean;
    border?: boolean;
    style?: ViewStyle;
    title: string;
    navigation: any;




}
const Header: FC<Props> = (props) => {
    const colorScheme = useColorScheme()

    const styles = StyleSheet.create({


        title: {
            fontFamily: 'KanitMedium',
            color: props.color || Colors[colorScheme].tint,
            fontSize: 24,

        },

        mainContainer: {


            width: '100%',
            borderTopLeftRadius: props.direction === 'vertical' && 15,
            borderTopRightRadius: props.direction === 'vertical' && 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: !props.isModal ? SIZES.header : SIZES.header - 20,
            borderBottomColor: Colors[colorScheme].gray,
            borderBottomWidth: props.border && 1,
            zIndex: 1,
            top: !props.isModal && 10


        },

        centerContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: !props.isModal ? 30 : 0
        },



    })
    return (

        <View style={[styles.mainContainer, { ...props.style }]}>

            <View style={{ left: 10, top: 10, zIndex: 1 }}>
                {!props.headerLeft ?
                    !props.isModal &&

                    <TouchableWithoutFeedback
                        onPress={() => { props.onBackPress ? props.onBackPress() : props.navigation.goBack() }}>


                        <View>
                            {props.direction || 'horizontal' === 'horizontal' ?
                                <Image
                                    source={assets.left_arrow}
                                    style={{ width: 24, height: 24, tintColor: props.color || Colors[colorScheme].tint }}
                                />

                                :
                                <Image
                                    source={assets.down_arrow}
                                    style={{ width: 45, height: 45, tintColor: props.color || Colors[colorScheme].tint }}
                                />

                            }
                        </View>
                    </TouchableWithoutFeedback>
                    :

                    props.headerLeft
                }

            </View>
            {!props.headerCenter ?
                <View style={{ alignItems: 'center', width: '100%', position: 'absolute' }} >
                    {props.isModal &&
                        <View style={{ width: '20%', height: 5, borderRadius: 25, backgroundColor: '#00000020', marginBottom: 10 }} />}
                    <Text style={[styles.title, { ...props.textStyle }]}>{props.title}</Text>

                </View>
                :

                props.headerCenter


            }








            <View style={{ marginRight: 10, right: 10, top: 10 }}>
                {props.headerRight}

            </View>

        </View>

    )
}


export default Header