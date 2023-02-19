import { USERS_NOTES, USERS_FLASHCARDS, USERS_CLASSES, USERS, USERS_DESK, USERS_STUDY_BUDDIES, USERS_CHATROOMS, USERS_FRIENDS, USERS_FRIENDS_DESK } from "../constants"

const initialState = {
    users: [],
    notes: [],
    flashcards: [],
    classes: [],
    desk: null,
    studyBuddies: [],
    chatrooms: [],
    friends: [],
    usersLoaded: 0
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS:
            return {
                ...state,
                users: [...state.users, action.user]
            }


        case USERS_NOTES:
            return {
                ...state,
                notes: action.notes
            }
        case USERS_FLASHCARDS:
            return {
                ...state,
                flashcards: action.flashcards
            }
        case USERS_CLASSES:
            return {
                ...state,
                classes: action.classes
            }

        case USERS_DESK:
            return {
                ...state,
                desk: action.desk
            }

        case USERS_STUDY_BUDDIES:
            return {
                ...state,
                studyBuddies: action.studyBuddies
            }



        case USERS_CHATROOMS:
            return {
                ...state,
                chatrooms: action.chatrooms
            }

        case USERS_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }

        case USERS_FRIENDS_DESK:
            return {
                ...state,
                usersLoaded: state.usersLoaded + 1,
                friends: state.users.map(user => user.uid === action.uid ? { ...user, desks: action.desk } : user)
            }

        default:
            return state



    }

}