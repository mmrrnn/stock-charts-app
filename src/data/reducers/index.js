import { combineReducers } from "redux";

import user from "./user-reducer";

const rootReducer = combineReducers({
    data: user
})

export default rootReducer;