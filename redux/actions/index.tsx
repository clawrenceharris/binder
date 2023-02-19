//actions are for altering redux state

import { useState } from "react";
import { get } from "react-hook-form";
import { auth, db } from "../../Firebase/firebase";
import useColorScheme from "../../hooks/useColorScheme";
import { SCHOOL_CLASSES, SCHOOL, SCHOOL_USERS, USER_CLASSES, USER_DESK, USER_FLASHCARDS, USER_NOTES, USER, USER_STUDY_BUDDIES, USER_CHATROOMS, USER_FRIENDS, USERS, CLASS, CLASSES, CLASSES_DESK, USER_SCHOOL, USERS_FRIENDS_DESK, SET_RANK, CLASSES_USERS } from "../constants";

export function fetchUserClassesData(id) {

    return ((dispatch) => {
        db.collection('classes')
            .doc(id)
            .onSnapshot(doc => {
                const data = doc.data()
                const id = doc.id
                dispatch({ type: USER_CLASSES, classState: { id, ...data } })
            })
    })

}
export function fetchClassesData(id) {
    return ((dispatch, getState) => {
        const found = getState().classesState.classes.some(el => el.id === id)
        if (!found) {
            db.collection('classes')
                .doc(id)
                .onSnapshot(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    dispatch({ type: CLASSES, classState: data })
                    dispatch(fetchClassesDesk(data?.desk.id))
                })
        }

    })
}



export function fetchUserClasses(schoolId, classId) {

    return ((dispatch, getState) => {
        const found = getState().userState.classes.some(el => el.id === classId)
        if (!found) {
            db.collection('schools')
                .doc(schoolId)
                .collection('classes')
                .doc(classId)
                .onSnapshot(doc => {
                    // console.log("DATA", doc.data())
                    dispatch({ type: USER_CLASSES, class: { id: doc.id, ...doc.data() } })

                })
        }

    })
}

export function fetchUserFriends(uid) {
    return ((dispatch, getState) => {
        const found = getState().userState.friends.some(el => el?.uid === uid)
        if (!found) {
            db.collection('users')
                .doc(uid)
                .onSnapshot(doc => {

                    dispatch({ type: USER_FRIENDS, friend: doc.data() })

                })

        }



    })
}

export function fetchRanks() {
    return ((dispatch) => {
        db.collection('ranks')
            .get()
            .then(query => {
                query.docs.forEach(doc => {
                    dispatch(fetchRank(doc.id))
                })

            })
    })


}


export function fetchRank(id) {
    return ((dispatch, getState) => {
        const found = getState().ranksState.ranks.some(el => el.id === id)
        if (!found) {
            db.collection('ranks')
                .doc(id)
                .get()
                .then(doc => {
                    const data = doc.data()
                    const id = doc.id
                    dispatch({ type: 'RANKS', rank: { id, ...data } })
                })
        }

    })


}



export function setRank(cookies) {
    return ((dispatch) => {

        db.collection('ranks')
            .where('minCookies', '<=', cookies)

            .get()
            .then(query => {
                const rank = query.docs[query.docs.length - 1].data()
                const id = query.docs[query.docs.length - 1].id
                dispatch({ type: SET_RANK, rank: { id, ...rank } })
            })
    })

}


export function fetchUserStudyBuddies(uid) {

    return ((dispatch, getState) => {
        const found = getState().userState.studyBuddies.some(el => el.uid === uid)

        if (!found) {
            db.collection('users')
                .doc(uid)
                .onSnapshot(doc => {

                    dispatch({ type: USER_STUDY_BUDDIES, studyBuddy: doc.data() })



                })
        }

    })
}


function fetchClassDesk(id) {
    return ((dispatch, getState) => {
        const classState = getState().userState.classes.find(el => el.id === id);

        db.collection('desks')
            .doc(id)
            .onSnapshot(doc => {
                const data = doc.data()
                const id = doc.id
                dispatch({ type: CLASSES_DESK, class: classState, desk: { id, ...data } })
            })
    })
}

function fetchClassUsers(id) {
    return ((dispatch, getState) => {
        const found = getState().userState.classes.some(el => el.id === id);
        if (!found) {
            db.collection('classUsers')
                .doc(id)
                .onSnapshot(doc => {
                    const data = doc.data().users.forEach()
                    const id = doc.id
                    dispatch({ type: CLASSES_USERS, user: { id, ...data } })
                })
        }

    })
}


export function fetchUsersFriendsNotes(uid) {
    return ((dispatch, getState) => {

        db.collection('desks')
            .doc(uid)
            .collection('notes')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                const uid = snapshot.docs[0].ref.path.split('/')[1]
                const user = getState().schoolState.users.some(el => el.uid === uid)
                const notes = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data, user }

                })
                dispatch({ type: USERS_FRIENDS_DESK, notes, uid })
            })
    })

}
export function fetchUsersFriendsFlashcards(uid) {
    return ((dispatch, getState) => {

        db.collection('desks')
            .doc(uid)
            .collection('flashcards')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                const uid = snapshot.docs[0].ref.path.split('/')[1]
                const user = getState().schoolState.users.some(el => el.uid === uid)
                const flashcards = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data, user }

                })
                dispatch({ type: USERS_FRIENDS_DESK, flashcards, uid })
            })
    })

}

export function fetchUsersFriendsDesk(uid) {
    return ((dispatch, getState) => {

        db.collection('desks')
            .doc(uid)
            .onSnapshot(doc => {


                const desk = doc.data()
                dispatch(fetchUsersFriendsFlashcards(uid))
                dispatch(fetchUsersFriendsNotes(uid))
                dispatch({ type: USERS_FRIENDS_DESK, desk })

            })
    })
}




export function fetchUsersData(uid) {

    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => {

            return el.uid === uid
        })

        //fetch the user if it does not already exist in array of users
        if (!found) {
            db.collection('users')
                .doc(uid)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        let user = doc.data()
                        user.uid = doc.id

                        dispatch({ type: USERS, user })

                    } else {
                        console.log('user does not exist')
                    }
                })
        }
    })
}



function fetchUserChatroom(id) {
    return ((dispatch, getState) => {
        const found = getState().userState.chatrooms.some(el => el.id === id)

        if (!found) {
            db.collection('chatrooms')
                .doc(id)
                .onSnapshot(doc => {
                    const data = doc.data()
                    const id = doc.id
                    const chatroom = { id, ...data }
                    dispatch({ type: USER_CHATROOMS, chatroom })

                })
        }
    })
}


export function fetchUserChatrooms() {
    return ((dispatch) => {


        db.collection('chatrooms')
            .doc(auth.currentUser.uid)
            .collection('userChatrooms')
            .get()
            .then(query => {
                query.docs.forEach(doc => {
                    dispatch(fetchUserChatroom(doc.id))
                })
            })









    })
}



//----------------------------------------------------------------COMPLETED---------------------------------------------------------------------------
//----------------------------------------------------------------COMPLETED---------------------------------------------------------------------------
//----------------------------------------------------------------COMPLETED---------------------------------------------------------------------------
//----------------------------------------------------------------COMPLETED---------------------------------------------------------------------------
export function fetchUserSchool(id) {
    return ((dispatch) => {
        db.collection('schools')
            .doc(id)
            .get()
            .then(doc => {
                dispatch({ type: SCHOOL, school: doc.data() })
                dispatch(fetchSchoolClasses(id))

                for (let i = 0; i < doc.data().users.length; i++) {
                    if (doc.data().users[i] !== auth.currentUser.uid)
                        dispatch(fetchSchoolUsers(doc.data().users[i]))


                }
            }).catch((e) => console.log("FETCH_USER_SCHOOL:", e))
    })


}


export function fetchUserDesk() {
    return ((dispatch) => {

        db.collection('desks')
            .doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                const desk = doc.data()


                dispatch({ type: USER_DESK, desk })
                dispatch(fetchUserNotes())
                dispatch(fetchUserFlashcards())
            })

    })
}


export function fetchUserNotes() {
    return ((dispatch) => {
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection('notes')
            .orderBy('createdAt', 'asc')
            .onSnapshot(query => {
                if (query) {
                    let notes = query.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })

                    dispatch({ type: USER_DESK, notes })

                }

            })
    })
}


export function fetchUserFlashcards() {
    return ((dispatch) => {
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection('flashcards')
            .orderBy('createdAt', 'asc')
            .onSnapshot(query => {

                let flashcards = query.docs.map(doc => {

                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data }
                })

                dispatch({ type: USER_DESK, flashcards })

            })
    })
}


export function fetchSchoolUsers(uid) {

    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid)

        if (!found) {
            db.collection('users')
                .doc(uid)
                .onSnapshot(doc => {
                    let user = doc.data()
                    user.uid = doc.id

                    dispatch(fetchUsersData(uid))



                })
        }


    })
}


export function fetchUser() {
    return ((dispatch) => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                if (doc.exists) {
                    const currentUser = doc.data()
                    const cookies = doc.data().cookies
                    const cookieCheckIn = doc.data().cookieCheckIn
                    dispatch({ type: USER, currentUser })
                    dispatch(fetchUserSchool(currentUser.school))
                    dispatch(setRank(cookies))


                    dispatch({ type: 'COOKIE_CHECK_IN', cookieCheckIn })
                    for (let i = 0; i < doc.data().classes.length; i++) {

                        dispatch(fetchUserClasses(doc.data().school, doc.data().classes[i]))
                    }
                    for (let i = 0; i < doc.data().studyBuddies.length; i++) {
                        dispatch(fetchUserStudyBuddies(doc.data().studyBuddies[i]))
                    }

                    for (let i = 0; i < doc.data().friends.length; i++) {
                        dispatch(fetchUserFriends(doc.data().friends[i]))
                    }

                } else {
                    console.log('user does not exist')
                }
            })
    })
}

export function fetchSchoolClasses(schoolId) {
    return ((dispatch) => {

        db.collection('schools')
            .doc(schoolId)
            .collection('classes')
            .orderBy('name', 'asc')
            .get()
            .then(query => {

                const classes = query.docs.map((doc) => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data }
                })
                console.log(classes.length)
                dispatch({ type: SCHOOL_CLASSES, classes })

            })


    })
}