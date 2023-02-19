import { FlatList, LogBox, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { Colors, assets } from '../constants'
import Button from '../components/Button'
import Input from '../components/StyledTextInput'
import { db } from '../Firebase/firebase'
import { handleSearchByName } from '../utils'
import ClassListItem from '../components/ClassListItem'
import SchoolListItem from '../components/ClassSchoolListItem'
import { SHADOWS } from '../constants/Theme'
import ClassSchoolListItem from '../components/ClassSchoolListItem'
import UserListItem from '../components/UserListItem'
import { connect } from 'react-redux'


const AddClasses = (props) => {
    const colorScheme = useColorScheme()
    //const [selected, setSelected] = useState([])
    const [selectedClasses, setSelectedClasses] = useState([])
    const selectionLimit = 10
    const { school } = props
    const [results, setResults] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {



        if (school) {

            console.log("hi")
            db.collection('schools')
                .doc(school.id)
                .collection('classes')
                .orderBy('name', 'asc')
                .get()
                .then(query => {

                    const classes = query.docs.map((doc) => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })

                    setData(classes)
                    setResults([...classes])

                })
        }


    }, [school])


    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'])

    function isSelected(item) {
        return selectedClasses.includes(item)
    }

    const onSelect = (item) => {

        if (selectedClasses.includes(item)) //if we select an item that is already selected
        {
            const deselect = selectedClasses.filter(selected => selected != item) // create a new data array that does not include the selected item
            return setSelectedClasses(deselect)
        }

        if (selectedClasses.length === selectionLimit) {
            return
        }
        console.log(item);

        setSelectedClasses(array => [...array, item]); // add item to selected items array

    }
    const handleSearch = (search) => {
        console.log(search)
        if (search.trim()) {
            setResults(data.filter(item => {
                const itemData = `${item?.name?.toUpperCase()} ${item?.displayName?.toUpperCase()}`;

                const textData = search.trim().toUpperCase();

                return itemData.indexOf(textData) > -1;
            }


            ))

        }
        else {
            setResults(data)
        }

    }

    const onDonePress = () => {
        // if (selectedData.length === 1) {
        //     update(selectedData[0])
        //     props.navigation.goBack();
        // }
        // else {
        //     update(selectedData)

        // }
    }

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: colorScheme === 'light' ? "#f4f4f4" : Colors.dark.background }}>


            <Header
                title={"Add Classes"}
                navigation={props.navigation}
                direction={'vertical'}
                isModal
                style={{ backgroundColor: colorScheme === 'light' ? "#f4f4f4" : Colors.dark.background }}
            />
            <View>



                <TextInput
                    placeholder={"Find classes"}
                    style={[styles.input, { backgroundColor: Colors[colorScheme].gray, color: Colors[colorScheme].tint }]}
                    onChangeText={(value) => { handleSearch(value) }}
                    placeholderTextColor={Colors[colorScheme].tint + '50'}
                    selectionColor={Colors.accent}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    spellCheck={false} />


                <ScrollView
                    style={{ flexDirection: 'row', left: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal>
                    {selectedClasses.map((item, index) => (
                        <View
                            key={index.toString()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: Colors.accent, paddingHorizontal: 10, padding: 4, borderRadius: 25 }}>
                                <Text style={{ fontFamily: 'Kanit', color: Colors.white }}>{item?.name + "  " || item?.displayName + "  "}</Text>

                            </View>


                        </View>
                    ))}
                </ScrollView>



            </View>


            <Text style={{ fontFamily: 'Kanit', color: 'gray', margin: 20, alignSelf: 'center' }}>{""}</Text>
            <ScrollView showsHorizontalScrollIndicator={false}   >
                <View style={{ ...SHADOWS[colorScheme] }}>

                    <FlatList
                        scrollEnabled={false}
                        data={selectedClasses}
                        renderItem={({ item, index }) =>
                            <ClassSchoolListItem
                                key={index.toString()}
                                isSelectable
                                type={'class'}
                                item={item}
                                isTop={index === 0}
                                isBottom={index === selectedClasses.length - 1}
                                isSelected={isSelected(item)}
                                onPress={() => onSelect(item)}
                                style={{ marginBottom: index === selectedClasses.length - 1 && 60 }}


                            />


                        }
                        keyExtractor={(item) => item.id}


                    />
                </View>


                <View style={{ ...SHADOWS[colorScheme], marginTop: 20 }}>



                    {results.length > 0 ?
                        <FlatList
                            scrollEnabled={false}

                            showsVerticalScrollIndicator={false}
                            data={results.filter(item => !selectedClasses.includes(item))}
                            renderItem={({ item, index }) =>
                                <ClassSchoolListItem
                                    key={index.toString()}
                                    isSelectable
                                    type={'class'}
                                    item={item}
                                    style={{ marginBottom: index === results.filter(item => !selectedClasses.includes(item)).length - 1 && 200 }}
                                    isTop={index === 0}
                                    isBottom={index === results.filter(item => !selectedClasses.includes(item)).length - 1}
                                    isSelected={isSelected(item)}
                                    onPress={() => onSelect(item)}
                                />


                            }
                            keyExtractor={(item) => item.id}
                        />

                        :
                        <Text style={{ alignSelf: 'center', fontFamily: 'Kanit', color: Colors[colorScheme].darkGray }}>{`No classes found.`}</Text>
                    }

                </View>
            </ScrollView>
            {selectedClasses.length > 0 &&
                <Button

                    title={'Done'}
                    style={{ position: 'absolute', bottom: 30, width: '50%' }}
                    onPress={onDonePress}

                />}

        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        color: 'white',
        backgroundColor: '#454545',
        borderRadius: 25,
        padding: 10,
        width: '100%',
        marginVertical: 20,
        fontFamily: 'Kanit'
    },

})

const mapStateProps = store => ({
    school: store.schoolState.school
})
export default connect(mapStateProps, null)(AddClasses)