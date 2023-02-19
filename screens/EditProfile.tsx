import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'

const EditProfile = ({ route }) => {
    console.log(route.params)
    const user = route.params.user
    return (
        <View style={{ flex: 1, backgroundColor: '#333', padding: 20 }}>
            {user.photoURL && <ImageBackground source={user.photoURL} style={styles.profileImageContainer} />

            }

            {!user.photoURL && <View style={styles.profileImageContainer}>
                <Image source={assets.grad_cap} style={{ width: 100, height: 100, tintColor: 'darkgray' }} />
            </View>

            }


            <View>

                <Text>Name</Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    profileImageContainer: {
        width: 150,
        height: 250,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default EditProfile