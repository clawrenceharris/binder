import { View, useWindowDimensions, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent, FlatListProps } from 'react-native'
import React, {  FC, forwardRef, LegacyRef, useRef, useState } from 'react'
import Animated from 'react-native-reanimated';
import Footer from './Footer';

interface Props {
    slides: JSX.Element[]
    onIndexChanged: (index: number) => void;
    renderPagination:()=>JSX.Element
    onScroll: (nativeEvent: NativeSyntheticEvent<NativeScrollEvent>)=>void
    ref: (ref: any)=>void 
}
interface ReanimatedFlatlistProps<T> extends FlatListProps<T> {

}

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList)
const AnimatedFlatList = forwardRef<FlatList, ReanimatedFlatlistProps<any>>((props, ref) => {
    const { width, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        mainContainer: {
            width: width,
            height: height,

        }
    })

    return (

        <ReanimatedFlatList
            {...props}

            ref={ref} />
    )
})
const Swiper: FC<Props> = (props) => {
    const flatListRef = useRef()
    console.log(flatListRef)
    const [currentIndex, setCurrentIndex] = useState(0)
    const ICON_SIZE =30
    const { width, height } = useWindowDimensions();
   
    const onChange = (nativeEvent) =>{
        if(nativeEvent){
            const index = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(index != currentIndex){
                setCurrentIndex(index)
                props.onIndexChanged(currentIndex)
            }
        }
    }
    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
        props.onIndexChanged(viewableItems[0].index)

    }).current
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    
    const styles = StyleSheet.create({
        mainContainer: {
            width: width ,
            height: height,
         
        }
    })
   
    return (

        <View style={StyleSheet.absoluteFillObject}>
           

           
           <View>
            <AnimatedFlatList 
                    data={props.slides}
                    onScroll={props.onScroll}
                    scrollEventThrottle={1}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig.current}

                    // onScrollEndDrag={({ nativeEvent }) => {onChange(nativeEvent)}}
                    style={styles.mainContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    ref= {flatListRef}
                    renderItem={({ item }) =>
                        <View
                            style={[styles.mainContainer, { paddingHorizontal: 5 }]}
                        >
                            {item}
                        </View>}
            
            />
           </View>
           
            <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>
                <Footer onPress={(index) => { flatListRef.current?.scrollToIndex({index, animated: false})}} scrollX={null} currentIndex={currentIndex} />

            </View>
        </View>

    )
}

export default Swiper


// import React, { FC, useEffect } from "react";
// import { Dimensions, Image, StyleSheet, View } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//     add,
//     clockRunning,
//     cond,
//     debug,
//     divide,
//     eq,
//     floor,
//     not,
//     set,
//     useCode,
// } from "react-native-reanimated";
// import {
//     snapPoint,
//     timing,
//     useClock,
//     usePanGestureHandler,
//     useValue,
// } from "react-native-redash";


// export const assets = [
//     require("../assets/images/image01.jpeg"),
//     require("../assets/images/person01.png"),

// ];


// interface Props {
//     slides: JSX.Element[]
//     onSwipe: (index: Animated.Value<0>) => void;
// }

// const Swiper: FC<Props> = (props) => {
//     const { width, height } = Dimensions.get("window");

//     const snapPoints = props.slides.map((_, i) => i * -width);

//     const clock = useClock();
//     const index = useValue(0);
//     const offsetX = useValue(0);
//     const translateX = useValue(0);
//     const styles = StyleSheet.create({
//         container: {
//             ...StyleSheet.absoluteFillObject,
//             backgroundColor: "black",
//         },
//         pictures: {
//             width: width * props.slides.length,
//             height,
//             flexDirection: "row",
//         },
//         picture: {
//             width,
//             height,
//             overflow: "hidden",
//         },
//         image: {
//             ...StyleSheet.absoluteFillObject,
//             width: undefined,
//             height: undefined,
//         },
//     });
//     const {
//         gestureHandler,
//         state,
//         velocity,
//         translation,
//     } = usePanGestureHandler();
//     const to = snapPoint(translateX, velocity.x, snapPoints);
//     useCode(
//         () => [
//             cond(eq(state, State.ACTIVE), [
//                 set(translateX, add(offsetX, translation.x)),
//             ]),
//             cond(eq(state, State.END), [
//                 set(translateX, timing({ clock, from: translateX, to })),
//                 set(offsetX, translateX),
//                 cond(not(clockRunning(clock)), [
//                     set(index, floor(divide(translateX, -width))),
//                     debug("index", index),

                    

//                 ]),
//             ]),
//         ],
//         []
       
//     );


//     return (
//         <View style={styles.container}>
//             <PanGestureHandler {...gestureHandler}>

//                 <Animated.View
//                     style={[styles.pictures, { transform: [{ translateX }] }]}
//                 >
//                     {props.slides.map((item) => (
//                         <View style={{ paddingHorizontal: 10, flex: 1 }}>
//                             {item}
//                         </View>

//                     ))}
//                 </Animated.View>

//             </PanGestureHandler>
//         </View>
//     );
// };

// export default Swiper;