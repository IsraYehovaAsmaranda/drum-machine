import { createStore } from "redux";
import rootReducer from "./reducer/combineReducer";

const store = createStore(rootReducer);

export default store;