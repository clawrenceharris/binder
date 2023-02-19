import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '../constants'
const ScrollableImages = ({ images }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const { width } = useWindowDimensions();
    const postDim = width - 20
    const onViewableItemsChanged = useRef((item) => {
        const index = item.viewableItems[0].index;
        setCurrentSlideIndex(index)

    })
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    return (

        <View>
            <View style={{ padding: 10 }}>

                <View style={{ alignItems: 'flex-end' }}>

                    <View style={{
                        backgroundColor: 'lightgray', width: 40, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                    }}>
                        < Text style={{ fontFamily: 'Kanit' }}>{currentSlideIndex + 1} / {images?.length}</Text>

                    </View>
                </View>

            </View >
            <FlatList
                data={images}
                renderItem={({ item }) =>
                    <View style={{ padding: 10, height: '70%' }}>
                        <Image source={{ uri: item }} style={{ resizeMode: 'cover', width: postDim, height: postDim }} />
                    </View>
                }

                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
            />


            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {images?.map((item, index) =>
                    <View
                        key={index.toString()}
                        style={{ marginTop: 10, width: 6, height: 6, borderRadius: 50, backgroundColor: currentSlideIndex === index ? Colors.accent : 'lightgray', marginRight: 10 }} />
                )}
            </View>

        </View >


    )
}

export default ScrollableImages