import { combineReducers } from "redux";

import user from "./userReducer";
import stockData from './stockDataReducer';

const rootReducer = combineReducers({
    user,
    stockData
})

export default rootReducer;