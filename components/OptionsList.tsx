import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../constants'
import ToggleSwitch from 'toggle-switch-react-native'
import useColorScheme from '../hooks/useColorScheme'

const OptionsList = (props) => {
    const [isOn, setIsOn] = useState(props.isOn)
    const colorScheme = useColorScheme()
    const getIcon = (title) => {

        switch (title) {
            case 'Pin': return assets.thumbtack;
            case 'Bookmark': return assets.bookmark;
            case 'Share': return assets.send_o;
            case 'Reply': return assets.reply;
            case 'Delete': return assets.trash;
            case 'Clear Desk': return assets.trash;
            case 'Edit': return assets.pencil;
            case 'Public': return assets.unlock;
            case 'New Notes': return assets.add;
            case 'Leave Group': return assets.leave;
            case 'Leave Class': return assets.leave;

            case 'Desk Settings': return assets.settings;
            case 'Mute': return assets.bell;
            case 'Copy': return assets.copy;
            case 'Bookmarked':

        }
        return null
    }

    const getColor = (title) => {
        switch (title) {

            case 'Delete': return Colors.light.red;
            case 'Clear Desk': return Colors.light.red;
            case 'Leave Group': return Colors.light.red;



        }
        return Colors[colorScheme].tint
    }
    const styles = StyleSheet.create({


        optionContainer: {
            backgroundColor: Colors[colorScheme].background,

            width: '100%',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between'





        },
        separator: {
            backgroundColor: Colors[colorScheme].gray,
            width: '100%',
            height: 1

        },
        optionTitle: {

            fontFamily: 'KanitMedium',
            fontSize: 18,

        }


    })

    return (
        <View>


            <FlatList
                data={props.options}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item, index }) =>
                    <TouchableWithoutFeedback

                        onPress={() => {
                            props.onOptionPress[index]()
                            if (index === props.switchIndex) {
                                setIsOn(!isOn);
                                props.onToggle();
                            }


                        }}>

                        <View style={[styles.optionContainer, {
                            borderTopRightRadius: index === 0 && 20,
                            borderTopLeftRadius: index === 0 && 20,
                            borderBottomRightRadius: index === props.options.length - 1 && 20,
                            borderBottomLeftRadius: index === props.options.length - 1 && 20


                        }]}>
                            <View style={{ flexDirection: 'row' }}>
                                {getIcon(item) != null && <Image source={getIcon(item)} style={{ width: 25, height: 25, tintColor: Colors[colorScheme].tint }} />}

                                <Text style={[styles.optionTitle, { color: getColor(item), marginLeft: 20, }]}>{item}</Text>

                            </View>


                            {index === props.switchIndex &&
                                <ToggleSwitch
                                    animationSpeed={100}

                                    onToggle={() => {
                                        props.onToggle();
                                        setIsOn(!isOn)
                                    }}
                                    isOn={isOn}
                                    onColor={Colors.accent}
                                    size={'large'}
                                    offColor={'#646464'} />}

                        </View>
                    </TouchableWithoutFeedback>

                }
                keyExtractor={item => item}
            />

            <View style={{ backgroundColor: Colors[colorScheme].background, padding: 15, width: '100%', borderRadius: 20, marginTop: 20 }}>
                <Text style={[styles.optionTitle, { textAlign: 'center' }]}>Cancel</Text>
            </View>

        </View>


    )
}

export default OptionsList