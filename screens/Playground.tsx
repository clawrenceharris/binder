import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { Colors } from '../constants'
import Button from '../components/Button'

const Playground = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, paddingHorizontal: 10 }}>
            <Header
                navigation={navigation}
                title={'Playgrounds'}

                style={{ backgroundColor: Colors.primary }}


            />

            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'Kanit', color: 'white', textAlign: 'center' }}>{'Playgrounds is where you can socialize and study with students from other schools. \n\n Play fun study games, join study groups and more!'}</Text>

                <Button
                    title={'Get Started!'}
                    onPress={function (): void {
                        alert('This feature is not yet ready for use. Check again later.')
                    }}
                    style={{ marginTop: '50%' }}

                />

            </View>



        </View>
    )
}

export default Playground