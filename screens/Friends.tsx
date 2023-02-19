import { View, Text } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

const Friends = (props) => {
    const { friends } = props
    console.log(friends.length)
    return (
        <View>
            <Text>Friends</Text>
        </View>
    )
}
const mapStateToProps = (store) => ({
    friends: store.userState.friends
})
export default connect(mapStateToProps, null)(Friends)