import { TOGGLE_BANK } from "../const/const";

const bankReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_BANK:
            return !state;
        default:
            return state;
    }
}

export default bankReducer