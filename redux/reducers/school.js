import {
    SCHOOL_CLASSES,
    SCHOOL,
    SCHOOL_USERS,
} from "../constants"

const initialState = {
    school: null,
    users: [],
    classes: []
}

export const school = (state = initialState, action) => {
    switch (action.type) {

        case SCHOOL:
            return {
                ...state,
                school: action.school
            }
        case SCHOOL_USERS:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case SCHOOL_CLASSES:
            return {
                ...state,
                classes: action.classes
            }


        default:
            return state



    }

}