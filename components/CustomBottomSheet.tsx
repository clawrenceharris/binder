import { Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import Animated from 'react-native-reanimated'
import { SHADOWS } from '../constants/Theme'
interface Props {
    show: boolean;
    children?: JSX.Element;
    snapPoints: (string | number)[];
    onClose?: () => void;
    renderContent: () => void;


}
const CustomBottomSheet: FC<Props> = (props) => {
    const fall = new Animated.Value(1)

    const colorScheme = useColorScheme()
    const bs = useRef(null)
    const renderBottomSheetHeader = () => (
        <View style={{ width: '100%', backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background, padding: 20, alignItems: 'center', borderTopRightRadius: 20, borderTopLeftRadius: 20, ...SHADOWS[colorScheme], shadowOffset: { width: -1, height: -7 } }}>
            <View style={{ height: 5, width: '15%', backgroundColor: '#00000020', borderRadius: 25 }}></View>
        </View>
    )
    useEffect(() => {
        if (props.show) {
            bs.current.snapTo(0)
        }
        else {
            bs.current.snapTo(1)
        }


    }, [props.show])


    return (
        <BottomSheet
            onCloseEnd={() => { console.log("Bottom sheet closed"); props.onClose() }}
            ref={bs}

            snapPoints={props.snapPoints}
            initialSnap={1}
            callbackNode={fall}
            enabledHeaderGestureInteraction
            renderContent={props.renderContent}
            renderHeader={renderBottomSheetHeader}
        />
    )
}

export default CustomBottomSheet