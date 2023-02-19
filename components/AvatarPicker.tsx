import { View, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { getItemLayout } from '../utils'
import { SHADOWS } from '../constants/Theme'
import Button from './Button'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CustomBottomSheet from './CustomBottomSheet'
import avatars from '../constants/avatars'

const AvatarPicker = (props) => {


    const colorScheme = useColorScheme()

    const [selectedAvatar, setSelectedAvatar] = useState(null)



    const maleAvatars = [

        "https://i.ibb.co/tCjpSJQ/boy1.png",
        "https://i.ibb.co/XWwfvL3/boy2.png",
        "https://i.ibb.co/3B6kQSP/boy3.png",
        "https://i.ibb.co/7QHL6Qn/boy4.png",
        "https://i.ibb.co/1TvCWMV/boy5.png",
        "https://i.ibb.co/njt7rdH/boy6.png",
        "https://i.ibb.co/Gdxm9YW/boy7.png",




    ]
    const femaleAvatars = [
        "https://i.ibb.co/bvJLw4Y/girl1.png",
        "https://i.ibb.co/f4n5Gp7/girl2.png",
        "https://i.ibb.co/d4WtXGf/girl3.png",
        "https://i.ibb.co/kSbf01t/girl4.png",
        "https://i.ibb.co/k6886Q0/girl5.png",
        "https://i.ibb.co/1sRSLTn/girl6.png",
        "https://i.ibb.co/LkBtF2V/girl7.png",
        "https://i.ibb.co/qdWvhX2/girl8.png"
    ]




    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Males' },
        { key: 'second', title: 'Females' },
    ]);



    const MaleAvatarsScreen = () => {
        return (

            <View style={{ alignItems: 'center', height: '100%' }}>

                <FlatList
                    numColumns={4}
                    getItemLayout={getItemLayout}
                    data={maleAvatars}
                    renderItem={({ item }) =>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ marginRight: 10, marginBottom: 10, borderWidth: 1.5, borderRadius: 50, borderColor: selectedAvatar === item ? Colors.accent : 'transparent' }}
                            onPress={() => setSelectedAvatar(item)}>
                            <Image source={{ uri: item }} style={{ width: 60, height: 60, borderRadius: 50 }} />

                        </TouchableOpacity>}
                    keyExtractor={item => item.toString()}


                />

            </View>

        )
    }
    const FemaleAvatarsScreen = () => {
        return (

            <View style={{ alignItems: 'center', height: '100%', marginBottom: 40 }}>

                <FlatList
                    numColumns={4}
                    getItemLayout={getItemLayout}
                    data={femaleAvatars}
                    renderItem={({ item }) =>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ marginRight: 10, marginBottom: 10, borderWidth: 1.5, borderRadius: 50, borderColor: selectedAvatar === item ? Colors.accent : 'transparent' }}
                            onPress={() => setSelectedAvatar(item)}>
                            <Image source={{ uri: item }} style={{ width: 60, height: 60, borderRadius: 50 }} />

                        </TouchableOpacity>}
                    keyExtractor={item => item.toString()}


                />

            </View>
        )
    }

    const renderContent = () => (

        <View style={{ backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background, height: '100%' }}>

            <TabView
                renderScene={renderScene}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

                renderTabBar={(props) =>
                    <TabBar
                        {...props}

                        labelStyle={{ color: Colors[colorScheme].tint, fontFamily: 'KanitMedium' }}
                        indicatorStyle={{ backgroundColor: Colors.accent, borderRadius: 25, height: 5 }}
                        style={{ width: '90%', alignSelf: 'center' }}
                        indicatorContainerStyle={{ backgroundColor: colorScheme === 'light' ? Colors.white : Colors.dark.background }}
                    >

                    </TabBar>

                }
            />

            {selectedAvatar &&

                <Button
                    title={selectedAvatar ? 'Done 👍' : 'Done'}
                    onPress={() => props.onSubmit(selectedAvatar)}
                    style={{ position: 'absolute', bottom: 20 }}
                    loading={props.loading}
                />
            }

        </View>
    )
    const renderScene = SceneMap({
        first: MaleAvatarsScreen,
        second: FemaleAvatarsScreen,
    });
    return (

        <CustomBottomSheet
            onClose={props.onClose}
            snapPoints={[330, 0]}
            show={props.show}
            renderContent={renderContent}


        >

        </CustomBottomSheet>


    )
}

export default AvatarPicker