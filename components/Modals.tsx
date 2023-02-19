import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../constants"
import useColorScheme from "../hooks/useColorScheme"
import Button from "./Button";
import CustomText from "./CustomText";

interface ConfirmationModalProps {
    message?: string;
    cancelText?: string;
    confirmText?: string;
    title?: string;
    loading?: boolean;
    onConfirmPress: () => void
    onCancelPress: () => void
    highlightedColor?: string;
}
interface SubmitModalProps {
    children?: JSX.Element;
    loading?: boolean;
    cancelText?: string;
    submitText?: string;
    title?: string;
    subtitle: string;
    onSubmitPress: () => void;
    onCancelPress: () => void;
    highlightedColor?: string;
}
export const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
    const colorScheme = useColorScheme()
    return (
        <View style={{ width: '100%', alignItems: 'center' }} >
            <View style={{ borderBottomWidth: 2, borderBottomColor: Colors[colorScheme].tint, paddingBottom: 5 }}>
                <Text style={{ color: Colors[colorScheme].tint, fontSize: 18, fontFamily: 'Kanit' }}>{props.title || "Are You Sure?"}</Text>

            </View>

            <CustomText
                text={props.message || "Are you sure you want to do this?"}
                highlightedColor={props.highlightedColor}
                textStyle={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center', marginVertical: 20 }} />


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                <TouchableOpacity
                    activeOpacity={1}

                    style={{ paddingHorizontal: 20, width: '50%', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors[colorScheme].gray }}
                    onPress={props.onCancelPress}>
                    <Text style={{ color: Colors[colorScheme].tint, marginTop: 5, fontSize: 16, fontFamily: 'KanitLight' }}>{props.cancelText || "CANCEL"}</Text>
                </TouchableOpacity>

                {props.loading ?
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        < ActivityIndicator size='small' color={Colors.accent} />

                    </View>
                    :
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ width: '50%', alignItems: 'center' }}
                        onPress={props.onConfirmPress}>
                        <Text style={{ paddingHorizontal: 20, color: Colors.accent, marginTop: 5, fontSize: 18, fontFamily: 'KanitBold' }}>{props.confirmText || "I'm Sure 👍"}</Text>
                    </TouchableOpacity>


                }
            </View>

        </View>
    )
}

export const SubmitModal: FC<SubmitModalProps> = (props) => {
    const colorScheme = useColorScheme()
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ borderBottomWidth: 2, borderBottomColor: Colors[colorScheme].tint, paddingBottom: 5 }}>
                <Text style={{ color: Colors[colorScheme].tint, fontSize: 18, fontFamily: 'Kanit' }}>{props.title || ""}</Text>

            </View>

            <Text style={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center', marginVertical: 20 }}>{props.subtitle || ""}</Text>


            {props.children}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

                <TouchableOpacity


                    style={{ paddingHorizontal: 20, width: '50%', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors[colorScheme].gray }}
                    onPress={props.onCancelPress}>
                    <Text style={{ color: Colors[colorScheme].tint, marginTop: 5, fontSize: 16, fontFamily: 'KanitLight' }}>{props.cancelText || "CANCEL"}</Text>
                </TouchableOpacity>

                {props.loading ?
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        < ActivityIndicator size='small' color={Colors.accent} />

                    </View>
                    :
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ width: '50%', alignItems: 'center' }}
                        onPress={props.onSubmitPress}>
                        <Text style={{ paddingHorizontal: 20, color: Colors.accent, marginTop: 5, fontSize: 18, fontFamily: 'KanitBold' }}>{props.submitText || "Done 👍"}</Text>
                    </TouchableOpacity>


                }
            </View>
        </View>
    )
}