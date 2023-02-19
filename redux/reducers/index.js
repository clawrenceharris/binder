import { combineReducers } from "redux";
import { user } from './user'
import { school } from './school'
import { users } from "./users";
import { classState } from "./class";
import { classes } from "./classes";
import { ranks } from "./ranks";

const Reducers = combineReducers({
    userState: user,
    schoolState: school,
    usersState: users,
    classState: classState,
    classesState: classes,
    ranksState: ranks
})

export default Reducers
