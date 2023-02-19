import { useNavigation } from "@react-navigation/native"
import { FC } from "react";
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { assets, Colors } from "../constants"
import useColorScheme from "../hooks/useColorScheme"
import { haptics } from "../utils";


interface Props {
    title: string;
    onPress: () => void;
    value?: string;
    titleColor?: string;
    isTop?: boolean;
    isBottom?: boolean;
    style?: ViewStyle;
    icon?: ImageSourcePropType;
    imageStyle?: ImageStyle;
}
const ListItemButton: FC<Props> = (props) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: 'white',
            borderTopLeftRadius: props.isTop ? 15 : 0,
            borderTopRightRadius: props.isTop ? 15 : 0,
            borderBottomLeftRadius: props.isBottom ? 15 : 0,
            borderBottomRightRadius: props.isBottom ? 15 : 0,
            flexDirection: 'row',
            padding: 20,
            borderBottomColor: '#00000020',
            borderBottomWidth: !props.isBottom && 1,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        icon: {
            width: 22,
            height: 22,
            tintColor: Colors[colorScheme].tint
        }
    })

    return (
        <TouchableOpacity onPress={() => { props.onPress(); haptics('light') }} >

            <View>
                <View style={[styles.mainContainer, { ...props.style }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={props.icon} style={[styles.icon, { ...props.imageStyle }]} />

                        <Text style={{ color: props.titleColor || Colors[colorScheme].tint, fontFamily: 'KanitSemiBold', fontSize: 16, marginLeft: props.icon && 10 }}>{props.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'gray', marginRight: 10 }}>{props.value}</Text>
                        <Image source={assets.right_arrow} style={{ width: 20, height: 20, tintColor: '#00000080' }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>


    )
}

export default ListItemButton