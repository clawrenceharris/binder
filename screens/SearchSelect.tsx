import { FlatList, LogBox, ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { Colors, assets } from '../constants'
import Button from '../components/Button'
import Input from '../components/StyledTextInput'
import { db } from '../Firebase/firebase'
import { getItemLayout, handleSearchByName } from '../utils'
import ClassListItem from '../components/ClassListItem'
import SchoolListItem from '../components/ClassSchoolListItem'
import { SHADOWS } from '../constants/Theme'
import ClassSchoolListItem from '../components/ClassSchoolListItem'
import UserListItem from '../components/UserListItem'
import useColorScheme from '../hooks/useColorScheme'
import StyledTextInput from '../components/StyledTextInput'


const SearchSelect = (props) => {
    const colorScheme = useColorScheme()
    const [selected, setSelected] = useState([])
    const placeholder = props.placeholder || props.route.params.placeholder
    const title = props.title || props.route.params.title
    const collectionPath = props.collectionPath || props.route.params.collectionPath
    const selectionLimit = props.selectionLimit || props.route.params.selectionLimit
    const data = props.data || props.route.params.data
    const update = props.update || props.route.params.update
    const buttonTitle = props.buttonTitle || props.route.params.buttonTitle
    const renderFilters = props.renderFilters || props.route.params.renderFilters




    const [results, setResults] = useState(data)
    const [search, setSearch] = useState('')
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'])

    function isSelected(item) {
        return selected.includes(item)
    }



    function onSelect(item) {

        if (selected.includes(item)) //if we select an item that is already selected then remove it from selected data
        {
            return deselect(item)
        }

        if (selected.length === selectionLimit && selectionLimit != 1) { // if we reached the selection limit then do nothing
            return
        }

        if (selected.length === selectionLimit && selectionLimit == 1) {
            return setSelected([item]); // replace the already selected item with this one

        }

        setSelected([...selected, item]); // add item to selected items array

    }
    const handleSearch = (search) => {
        setSearch(search)
        if (search.trim()) {
            setResults(data.filter(item => {

                const name = item?.name?.toUpperCase() || '' + item?.displayName?.toUpperCase() || ''
                search = search.trim().toUpperCase()



                return name.includes(search) || search.includes(name)
            }


            ))

        }
        else {
            setResults(data)
        }

    }

    const onDonePress = () => {
        if (selectionLimit === 1) {
            update(selected[0])

        }
        else {
            update(selected)

        }

        // props.navigation.goBack();

    }
    const deselect = (item) => {
        const deselected = selected.filter(selected => selected != item) // create a new data array that does not include the selected item
        return setSelected(deselected)
    }

    return (
        <View style={{ flex: 1, padding: 15, backgroundColor: colorScheme === 'light' ? "#f4f4f4" : Colors.dark.background }}>


            <Header
                title={title}
                navigation={props.navigation}
                direction={'vertical'}
                isModal
                style={{ backgroundColor: colorScheme === 'light' ? "#f4f4f4" : Colors.dark.background }}
            />
            <View>








                <StyledTextInput
                    icon={<Image
                        source={assets.search}
                        style={{ width: 20, height: 20, tintColor: Colors[colorScheme].veryDarkGray }} />
                    }
                    value={search}
                    placeholder={placeholder}
                    onChangeText={handleSearch}

                />



                {renderFilters && renderFilters()}

                <View style={{ height: 70, marginTop: 20 }}>


                    <FlatList
                        data={selected}
                        getItemLayout={getItemLayout}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>

                            <View style={{ maxWidth: selectionLimit > 1 ? 120 : 300, marginRight: 5, marginBottom: 5, backgroundColor: Colors.accent, paddingHorizontal: 10, padding: 4, borderRadius: 25, flexDirection: 'row', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ maxWidth: selectionLimit > 1 ? '80%' : '100%', fontFamily: 'Kanit', color: Colors.white, marginRight: 20 }}>{item?.name || item?.displayName}</Text>

                                <TouchableOpacity onPress={() => deselect(item)} style={{ position: 'absolute', right: 5, backgroundColor: Colors[colorScheme].background, padding: 5, borderRadius: 50 }}>

                                    <Image source={assets.close} style={{ tintColor: Colors[colorScheme].tint, width: 10, height: 10 }} />


                                </TouchableOpacity>
                            </View>


                        }
                        showsHorizontalScrollIndicator={false}

                    />
                </View>

            </View>


            <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center' }}>{""}</Text>
            <ScrollView showsVerticalScrollIndicator={false}   >



                <View style={{ ...SHADOWS[colorScheme] }}>



                    {results.length > 0 ?
                        <FlatList
                            style={{ marginBottom: 100 }}
                            scrollEnabled={false}

                            showsVerticalScrollIndicator={false}
                            data={results}
                            renderItem={({ item, index }) =>
                                collectionPath === 'classes' || collectionPath === 'schools' ?
                                    <ClassSchoolListItem
                                        key={index.toString()}
                                        isSelectable
                                        type={collectionPath === 'schools' ? 'school' : 'class'}
                                        item={item}
                                        isTop={index === 0}
                                        isBottom={index === results.length - 1}
                                        isSelected={isSelected(item)}
                                        onPress={() => onSelect(item)}

                                    />

                                    :

                                    <UserListItem
                                        key={index.toString()}
                                        icon={assets.check}
                                        type={'selectable'}
                                        user={item}
                                        isTop={index === 0}
                                        isBottom={index === results.length - 1}
                                        isSelected={isSelected(item)}
                                        onPress={() => onSelect(item)}
                                        onSelect={() => onSelect(item)}
                                        onProfileButtonPress={() => props.navigation.navigate('Profile', { uid: item.uid })}
                                    />
                            }
                            keyExtractor={(item) => item.id}
                        />

                        :
                        <Text style={{ alignSelf: 'center', fontFamily: 'Kanit', color: Colors[colorScheme].darkGray }}>{`No ${collectionPath} found.`}</Text>
                    }

                </View>
            </ScrollView>
            {selected.length > 0 &&
                <Button

                    title={props.buttonTitle ? buttonTitle(selected) : 'Done'}
                    style={{ position: 'absolute', bottom: 30, paddingHorizontal: 20, minWidth: '50%' }}
                    onPress={onDonePress}

                />}

        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        color: 'white',

        borderRadius: 25,
        width: '100%',
        marginVertical: 20,
        fontFamily: 'Kanit'
    },

})


export default SearchSelect