import { View, Text, Image, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Notes, Poll } from '../types';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants';
import { SHADOWS } from '../constants/Theme';
import useColorScheme from '../hooks/useColorScheme';
import ProfileButton from './ProfileButton';



export type PollProps = {
    poll: Poll;
    style: ViewStyle;



}
const PollMessage = (props: PollProps) => {
    const { poll } = props;
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.mainContainer, { ...SHADOWS[colorScheme], ...props.style }]}>
            <Text style={styles.title}>{poll.title}</Text>

            <View style={styles.optionsContainer}>


                {poll.options.map((item, index) => (
                    <View key={index.toString()}>

                        <Text style={{ fontFamily: 'Kanit', fontSize: 16 }}>{item.option}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

                            <View style={styles.percentageBarContainer}>
                                <View style={[styles.percentageBarVotes, { width: ((item.votes.length / poll.totalVotes) * 100) + '%' }]} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {item.votes.map((item, index) => (
                                    <View key={index.toString()} style={{ padding: 5, backgroundColor: 'white', borderRadius: 100, marginRight: -20, zIndex: -index }}>

                                        <ProfileButton
                                            size={30}
                                            imageURL={item.photoURL}

                                            buttonStyle={{ backgroundColor: 'lightgray' }}

                                        />
                                    </View>
                                ))}
                                <Text style={styles.voteCount}>{item.votes.length}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>


        </View>



    )
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: 300,
        alignItems: 'center',
        padding: 15
    },
    title: {
        fontFamily: 'KanitMedium',
        fontSize: 18
    },

    optionsContainer: {
        width: '100%',
        paddingRight: 90,
        marginTop: 20
    },
    percentageBarContainer: {
        width: '100%',
        height: 12,
        backgroundColor: 'lightgray',
        borderRadius: 50,
        marginRight: 10
    },

    percentageBarVotes: {
        height: 12,
        backgroundColor: Colors.primary,
        borderRadius: 25
    },
    voteCount: {
        position: 'absolute',
        right: -20,
        bottom: -10,
        fontFamily: 'Kanit',

    }
})
export default PollMessage