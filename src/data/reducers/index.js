import { combineReducers } from "redux";

import user from "./user-reducer";
import stockData from './stock-data-reducer';

const rootReducer = combineReducers({
    user,
    stockData
})

export default rootReducer;