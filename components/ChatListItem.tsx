import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ProfileButton from './ProfileButton'
import { SHADOWS } from '../constants/Theme'
import { auth, db, getData } from '../Firebase/firebase'
import GroupProfileCircle from './ProfileButton'
import { getDisplayNameOrYou } from '../utils'
import Users from '../constants/data/Users'
import { assets } from '../constants'
import { Chatroom } from '../types'
import { FC } from 'react'

const ChatListItem = (props) => {
  //const message = chatroom.messages[chatroom.messages.length - 1]
  const [users, setUsers] = useState([])
  const [lastUser, setLastUser] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)
  const colorScheme = useColorScheme()

  useEffect(() => {

    const array = []
    props.chatroom?.users?.forEach(user => {
      db.collection('users')
        .doc(user)
        .get()
        .then(doc => {
          array.push(doc.data())
          setUsers(array)
        })
    })
    db.collection('chatrooms').doc(props.chatroom.id).collection('chats').onSnapshot(query => setLastMessage(query.docs[0]))

    getData('users', lastMessage?.user?.uid, setLastUser)










  }, [lastUser])


  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={props.onPress}
      delayLongPress={3000}
      onLongPress={() => props.onLongPress()}>

      <View style={[{ ...styles.mainContainer }, { marginTop: 20, backgroundColor: colorScheme === 'light' ? 'white' : Colors.light.tint, ...SHADOWS[colorScheme], shadowRadius: 5 }]}>

        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
          <ProfileButton
            defaultImage={props.chatroom.type === 'private' ? assets.person : assets.group}

            imageURL={users.filter(user => user.uid != auth.currentUser.uid)[0]?.photoURL}
            containerStyle={{ marginLeft: 10 }}
            onPress={props.onProfileButtonPress}
          />



          <View>

            {props.chatroom.type === 'private' ?
              <Text style={[{ color: Colors[colorScheme].tint }, styles.name]}>{users.filter(user => user.uid != auth.currentUser.uid)[0]?.displayName}</Text>
              :
              <Text style={[{ color: Colors[colorScheme].tint }, styles.name]}>{props.chatroom.name}</Text>
            }

            {/* <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} /> */}
            {lastMessage && lastMessage?.contentType === 'text' &&

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {!lastMessage?.system &&
                  <Text style={{ fontFamily: 'Kanit', color: 'gray', marginRight: 2 }}>
                    {lastUser && getDisplayNameOrYou(lastUser) + ": " + lastMessage?.text}
                  </Text>}



              </View>}

            {lastMessage && lastMessage?.contentType === 'notes' &&

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {!lastMessage?.system &&
                  <Text style={{ fontFamily: 'Kanit', color: 'gray', marginRight: 2 }}>
                    {lastUser && getDisplayNameOrYou(lastUser) + " sent notes"}
                  </Text>}



              </View>}

            {lastMessage && lastMessage?.contentType === 'flashcards' &&

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {!lastMessage?.system &&
                  <Text style={{ fontFamily: 'Kanit', color: 'gray', marginRight: 2 }}>
                    {lastUser && getDisplayNameOrYou(lastUser) + " sent flashcards"}
                  </Text>}



              </View>}

          </View>

        </View>

      </View>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

    height: 60
  },
  avatar: {
    width: 60,
    height: 60
  },




  messageContent: {
    marginLeft: 10
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,



    shadowRadius: 2,
    shadowColor: '#272727',
    justifyContent: 'center'

  },
  name: {
    fontSize: 18,
    fontFamily: 'Kanit',
    marginLeft: 10



  }
})
export default ChatListItem