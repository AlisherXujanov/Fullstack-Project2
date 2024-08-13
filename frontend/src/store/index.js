import { createContext } from "react";
const BASE_URL = "http://127.0.0.1:8000"


const context = createContext()
const initialState = {
    currentUser: {},
    counter: 0,
}


function globalReducer(state, action) {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {...state, currentUser: action.payload}
        case "LOGOUT":
            return {...state, currentUser: {}}
        default:
            throw new Error("Unexpected action")
    }
}

export {
    context,
    initialState,
    globalReducer,
    BASE_URL,
};