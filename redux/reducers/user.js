import { SCHOOL, SCHOOL_USERS, USER_CLASSES, USER_DESK, USER_FLASHCARDS, USER_NOTES, USER, USER_STUDY_BUDDIES, USER_CHATROOMS, USER_FRIENDS, USER_SCHOOL, SCHOOL_CLASSES, SET_RANK } from "../constants"
import { classes } from "./classes"

const initialState = {
    currentUser: null,
    notes: [],
    flashcards: [],
    classes: [],
    desk: null,
    studyBuddies: [],
    school: null,
    chatrooms: [],
    friends: [],
    rank: {}
}

export const user = (state = initialState, action) => {
    switch (action.type) {





        case USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case 'COOKIE_CHECK_IN':
            return {
                ...state,
                cookieCheckIn: action.cookieCheckIn
            }
        case SET_RANK:
            return {
                ...state,
                rank: action.rank
            }
        case USER_CLASSES:
            return {
                ...state,
                classes: [...state.classes, action.class]
            }

        case USER_DESK:
            return {
                ...state,
                desk: action.desk,
                flashcards: action.flashcards,
                notes: action.notes
            }

        case USER_STUDY_BUDDIES:
            return {
                ...state,
                studyBuddies: [...state.studyBuddies, action.studyBuddy]
            }

        case USER_CHATROOMS:
            return {
                ...state,
                chatrooms: [...state.chatrooms, action.chatroom]
            }

        case USER_FRIENDS:

            return {
                ...state,

                friends: action.friend ? [...state.friends, action.friend] : [...state.friends]
            }

        case USER_SCHOOL:
            return {
                ...state,
                school: action.school
            }



        default:
            return state



    }

}