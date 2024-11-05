import { combineReducers } from "redux";
import bankReducer from "./bankReducer";

const rootReducer = combineReducers({ bank: bankReducer });

export default rootReducer;
