import { View, Text, FlatList, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import NotePost from './NotePost'
import { Colors } from '../constants'
import FlippableFlashcard from './FlippableFlashcard'
import { faker } from '@faker-js/faker'
const ScrollableFlashcards = ({ flashcards }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [reset, setReset] = useState(false)
    console.log(flashcards)
    const onViewableItemsChanged = useRef((item) => {
        const index = item.viewableItems[0].index;
        setCurrentSlideIndex(index)


    })
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    return (



        <FlatList
            data={flashcards}
            renderItem={({ item }) =>

                <FlippableFlashcard card={item} />


            }

            keyExtractor={(item) => faker.datatype.uuid()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
        />







    )
}

export default ScrollableFlashcards