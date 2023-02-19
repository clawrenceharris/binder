import { CLASSES, CLASSES_DESK, CLASSES_USERS } from "../constants"

const initialState = {
    classes: [],
    users: [],
    desk: null,

}

export const classes = (state = initialState, action) => {
    switch (action.type) {
        case CLASSES:
            return {
                ...state,
                classes: [...state.classes, action.classState]
            }


        case CLASSES_USERS:
            return {
                ...state,
                users: action.users
            }


        case CLASSES_DESK:
            return {
                ...state,
                desk: action.desk
            }


        default:
            return state



    }

}