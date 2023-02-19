import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import ClassListItem from './ClassListItem'
import Classes from '../constants/data/Classes'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { SHADOWS } from '../constants/Theme'

const ProfileListBox = ({ renderItem }) => {

  const [showMore, setShowMore] = useState(false)
  const [showLess, setShowLess] = useState(true)
  const colorScheme = useColorScheme()
  return (
    <View style={{ width: '100%', backgroundColor: Colors[colorScheme].background, ...SHADOWS.light, borderRadius: 15, marginTop: 10 }}>
      <View style={{ padding: 10, marginBottom: 5 }} showsVerticalScrollIndicator={false}>

        <ClassListItem Class={Classes[0]} />
        <ClassListItem Class={Classes[1]} />
        <ClassListItem Class={Classes[2]} />

        {showMore && <View>
          <ClassListItem Class={Classes[0]} />
          <ClassListItem Class={Classes[1]} />
          <ClassListItem Class={Classes[2]} />
        </View>}



      </View>

      {!showMore && <Button title='View more' onPress={() => { setShowMore(true) }} />}
      {showMore && <Button title='View less' onPress={() => { setShowMore(false) }} />}

    </View>
  )
}

export default ProfileListBox