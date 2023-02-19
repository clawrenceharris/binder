import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { ConfirmationModal, SubmitModal } from '../components/Modals'
import StyledTextInput from '../components/StyledTextInput'
import ToggleAnonymity from '../components/ToggleAnonymity'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import SpringModal from '../components/SpringModal'
import { getItemLayout } from '../utils'
import Button from '../components/Button'
import { auth } from '../Firebase/firebase'

const NewBurningQuestion = (props) => {
    const [selectedClass, setSelectedClass] = useState(null)
    const [tags, setTags] = useState([])
    const [question, setQuestion] = useState('')
    const [tag, setTag] = useState('')
    const colorScheme = useColorScheme()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [title, setTitle] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false);
    const onToggle = () => setIsAnonymous(isAnonymous);
    return (
        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
            <Header
                onBackPress={() => { console.log("back pressed"); setShowConfirmationModal(true) }}
                navigation={props.navigation}
                title='Burning Question'
            />

            <SpringModal onCancel={() => setShowConfirmationModal(false)} showModal={showConfirmationModal}>


                <ConfirmationModal
                    message='Discard your Burning Question?'
                    onConfirmPress={function (): void {
                        props.navigation.goBack()

                    }}
                    onCancelPress={function (): void {
                        setShowConfirmationModal(false)
                    }} />
            </SpringModal>

            <View style={{ padding: 20 }}>


                <ToggleAnonymity action={"Send"} user={props.route.params.user} style={{ marginBottom: 80 }} isOn={!isAnonymous} onToggle={onToggle} />


                <View style={{ marginBottom: 20 }}>


                    <StyledTextInput

                        placeholder="Title"
                        onChangeText={setTitle}
                        value={title}
                        autoFocus
                        isClearable

                    />
                </View>

                <View style={{ marginBottom: 20 }}>


                    <StyledTextInput
                        multiline
                        placeholder="Type your question..."
                        style={{ height: 200, borderRadius: 15 }}
                        onChangeText={setQuestion}
                        value={question}
                        autoFocus
                        isClearable

                    />
                </View>









                <View style={{ height: 100 }}>


                    <FlatList
                        data={tags}
                        keyExtractor={item => item}
                        showsHorizontalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        numColumns={3}
                        renderItem={({ item }) =>
                            <View style={{ maxWidth: 120, marginRight: 5, marginTop: 10, backgroundColor: Colors.primary, paddingHorizontal: 10, padding: 4, borderRadius: 25, flexDirection: 'row', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ maxWidth: '80%', fontFamily: 'Kanit', color: Colors.white, marginRight: 20 }}>{item}</Text>

                                <TouchableOpacity onPress={() => setTags(tags.filter(tag => tag != item))} style={{ position: 'absolute', right: 5, backgroundColor: Colors[colorScheme].background, padding: 5, borderRadius: 50 }}>

                                    <Image source={assets.close} style={{ tintColor: Colors[colorScheme].darkGray, width: 10, height: 10 }} />


                                </TouchableOpacity>
                            </View>

                        }
                    />
                </View>


                <StyledTextInput
                    multiline
                    placeholder="Add tags"
                    isClearable
                    onChangeText={setTag}
                    value={tag}
                    autoFocus
                    icon={

                        <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={!tag || tags.length > 8 || tags.includes(tag)}
                            onPress={() => { setTag(''); setTags([...tags, tag]) }}
                            style={{ padding: 6, backgroundColor: Colors.primary, borderRadius: 25 }}>
                            <Image source={assets.add} style={{ width: 15, height: 15, tintColor: Colors.white }} />
                        </TouchableOpacity>
                    }



                />



            </View>

            <Button
                title='Done'
                onPress={() => {

                    props.route.params.setBurningQuestion({
                        user: auth.currentUser.uid,
                        createdAt: new Date(),
                        isAnonymous,
                        title,
                        question,
                        tags

                    });
                    props.navigation.goBack()
                }
                }



            />

        </View >
    )
}

export default NewBurningQuestion